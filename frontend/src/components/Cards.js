// Card.js
import React from 'react';

export default function Card({ title, paragraph, image }) {
  return (
    <div className="group relative block max-w-screen-sm mx-auto h-64 sm:h-80 lg:h-96">
      {/* Card */}
      <div className="cards card relative flex h-full w-72 transform items-end border-2 border-none rounded-sm bg-white transition-transform group-hover:scale-105 overflow-hidden">
        {/* Image Section */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-60"
        />

        {/* Overlay for Hover Effect */}
        <div className="absolute inset-0 bg-primary opacity-0 transition-opacity group-hover:opacity-100"></div>

        {/* Content Section */}
        <div className="relative p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8 z-10">
          <h2 className="mt-4 text-xl font-medium sm:text-2xl text-white">{title}</h2>
        </div>

        <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 z-10">
          <h3 className="mt-4 text-xl font-medium sm:text-2xl text-white">{title}</h3>

          <p className="mt-4 text-sm sm:text-base text-white">{paragraph}</p>
        </div>
      </div>
    </div>
  );
}
