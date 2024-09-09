
import React from 'react'

export default function Card({number, title, paragraph, image}) {
  return (
  <div class="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden mx-10 rounded-xl transition-all transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg mobileS:mt-9 655Max:w-[75vmin]">
        <div class="w-24 h-24 bg-primary rounded-full absolute -right-5 -top-7">
            <p class="absolute bottom-6 left-7 text-white text-2xl">{number}</p>
        </div>
        <div class="fill-primary w-12">
            <img src={image} alt={title} class="w-full h-full object-cover" />
        </div>
    <h1 class="font-bold text-secondary text-xl">{title}</h1>
    <p class="text-sm text-secondary leading-6">{paragraph}</p>
  </div>
  )
}
