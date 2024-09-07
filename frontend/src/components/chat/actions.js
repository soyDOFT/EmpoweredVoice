'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

async function searchWeb(query) {
  const response = await axios.get(
    `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
  );

  // Return the snippet of the first item only
  const firstItem = response.data.items?.[0];
  return firstItem ? firstItem.snippet : 'No relevant information found.';
}

export async function continueConversation(history) {
  const stream = createStreamableValue();

  (async () => {
    const userMessage = history[history.length - 1].content;

    // Check if the user question needs a web search
    if (userMessage.toLowerCase().includes('latest information')) {
      const snippet = await searchWeb(userMessage);
      stream.update(`Latest information: ${snippet}`);
    } else {
      const { textStream } = await streamText({
        model: openai('gpt-4o'),
        system:
          "You are an election staff for the United States election system. Respond to questions related only to the election or candidates. For any other question respond by stating that it is out of your expertise and please ask a related question. Verify that the information you provide is relevant to the 2024 election. Only provide information relating to the year 2024.",
        messages: history,
      });

      for await (const text of textStream) {
        stream.update(text);
      }
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}