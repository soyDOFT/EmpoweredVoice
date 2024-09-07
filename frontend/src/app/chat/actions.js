
'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';

export async function continueConversation(history) {
  'use server';

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o-mini'),
      system:
        "You are a an election staff for the United States election system. Respond to questions related only to the election or candidates. For any other question respond by stating that it is out of your expertise and please ask a related question.Verify that the information you provide is relevant to the 2024 election ",
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}