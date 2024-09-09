'use client'
import React, { useState } from 'react'

const TopQuestions = [
  {
    question: "Am I registered to vote?",
    answer: "You can check your voter registration status by visiting your state's Secretary of State website or using the National Voter Registration Day lookup tool."
  },
  {
    question: "How do I register to vote?",
    answer: "You can register to vote online, by mail, or in person. Visit Vote.gov to find the options available in your state."
  },
  {
    question: "When is the deadline to register to vote?",
    answer: "Voter registration deadlines vary by state. Generally, it's best to register at least 30 days before an election, but some states allow same-day registration."
  },
  {
    question: "Where do I vote?",
    answer: "You can find your polling place by checking your state or local election office's website, or by using the Get to the Polls tool."
  },
  {
    question: "What ID do I need to vote?",
    answer: "ID requirements vary by state. Check your state's requirements on the National Conference of State Legislatures website."
  },
  {
    question: "Can I vote early?",
    answer: "Many states offer early voting. Check your state's election website for early voting dates, times, and locations."
  },
  {
    question: "How do I get an absentee ballot?",
    answer: "You can request an absentee ballot from your state or local election office. Some states require an excuse to vote absentee, while others offer no-excuse absentee voting."
  },
  {
    question: "What's on my ballot?",
    answer: "You can preview your ballot using tools like Ballotpedia's Sample Ballot Lookup or Vote411.org."
  },
  {
    question: "How can I work as a poll worker?",
    answer: "Contact your local election office to inquire about becoming a poll worker. You can also sign up through the U.S. Election Assistance Commission's help wanted page."
  },
  {
    question: "How can I get involved in voter registration efforts?",
    answer: "You can volunteer with organizations like HeadCount, Rock the Vote, or your local election office to help register voters in your community."
  }
]

const OtherQuestions = [
  {
    question: "What if I've moved since I last voted?",
    answer: "If you've moved, you need to update your voter registration. You can do this online in most states or by contacting your local election office."
  },
  {
    question: "Can I register to vote if I'm a student living away from home?",
    answer: "Yes, you can choose to register either at your school address or your home address. Be sure to only register and vote in one location."
  },
  {
    question: "What if I'm not 18 yet, but will be by Election Day?",
    answer: "In many states, you can register to vote if you will be 18 by the next general election. Check your state's specific rules."
  }
]

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-5 text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >{question}
      </button>
      {isOpen && (
        <div className="pb-5 pr-12">
          <p className="text-base text-primary">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState({ top: null, other: null })

  const toggleFAQ = (section, index) => {
    setOpenIndex(prev => ({
      ...prev,
      [section]: prev[section] === index ? null : index
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Voting FAQ</h1>
          <p className="mt-2 text-xl text-center">Get answers to your voting questions</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <a
            href="https://www.vote.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-red-700 transition duration-300"
          >
            Register to Vote
          </a>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Top 10 Questions</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {TopQuestions.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex.top === index}
                toggleOpen={() => toggleFAQ('top', index)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Other Common Questions</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {OtherQuestions.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex.other === index}
                toggleOpen={() => toggleFAQ('other', index)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}