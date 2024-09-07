'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { continueConversation } from './actions'
import { readStreamableValue } from 'ai/rsc'

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [conversation, setConversation] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [conversation])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const newQuery = input
    setInput('')
    setIsLoading(true)

    const newConversation = [...conversation, { role: 'user', content: newQuery }]
    setConversation(newConversation)

    try {
      const { messages, newMessage } = await continueConversation(newConversation)

      let textContent = ''

      for await (const delta of readStreamableValue(newMessage)) {
        textContent = `${textContent}${delta}`
        setConversation([
          ...messages,
          { role: 'assistant', content: textContent },
        ])
      }
    } catch (error) {
      console.error('Error in conversation:', error)
      setConversation([
        ...newConversation,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col h-[500px] max-h-[80vh]">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Election Assistant</h2>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6 text-primary" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-3 max-w-[70%] ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}