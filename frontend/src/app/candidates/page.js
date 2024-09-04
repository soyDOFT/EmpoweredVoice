"use client";

import React, { useState } from 'react';
import Countdown from '@/components/Countdown';

export default function Page() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState('');

  const currentPresidentialCandidates = [
    { name: 'Kamala Harris', party: 'Democratic', state: 'CA', office: 'President', imageUrl: '/presidential-candidates/kamala.webp', description: 'Current Vice President of the United States.' },
    { name: 'Donald Trump', party: 'Republican', state: 'FL', office: 'President', imageUrl: '/presidential-candidates/donald-trump.jpg', description: 'Former President of the United States.' },
    { name: 'Chase Oliver', party: 'Libertarian', state: 'FL', office: 'President', imageUrl: '/presidential-candidates/chase-oliver.png', description: 'Libertarian candidate for President in 2024.' },
    { name: 'Jill Stein', party: 'Green', state: 'MA', office: 'President', imageUrl: '/presidential-candidates/jill-stein.jpg', description: 'Former Green Party candidate for President and environmental activist.' },
    // Add other candidates here
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/fec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state }),
      });
      const data = await res.json();
      setCandidates(data.candidates);
    } catch (err) {
      setError('Error fetching candidates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="candidate-hero flex flex-col justify-center items-center text-white text-2xl h-48">
        <h2 className='text-7xl text-center mb-8'>Countdown to the <br></br>2024 presidential election</h2>
        <Countdown />
          <button className="btn  text-white border-none bg-primary mt-4  max:mt-20 max:w-40 max:text-2xl hover:bg-[#0367feb6] hover:text-white">Meet the candidates</button>
        </div>
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 mt-14 mb-14   ">
          {currentPresidentialCandidates.map((candidate, index) => (
            <div key={index} className="card bg-base-100 w-80 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={candidate.imageUrl}
                  alt={candidate.name}
                  className="rounded-xl h-60 w-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{candidate.name}</h2>
                <p className="font-bold">{candidate.party}</p>
                <p>{candidate.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col lg:flex-row my-14">
          <div className="card rounded-box grid h-32 flex-grow place-items-center text-secondary text-2xl  ">          
            <h1>Search Candidates running for office in your state</h1>
            <div className="card bg-page rounded-box grid flex-grow place-items-center">
          <div class="relative mt-6">
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="NC" value={state} onChange={(e) => setState(e.target.value)} class="block w-full rounded-2xl border border-secondary bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"/>
            <div class="absolute inset-y-1 right-1 flex justify-end">
          <button type="submit" aria-label="Submit" class="flex aspect-square h-full items-center justify-center rounded-xl bg-primary text-white transition hover:bg-secondary">
            <svg viewBox="0 0 16 6" aria-hidden="true" class="w-4">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 3 10 .5v2H0v1h10v2L16 3Z"
              ></path>
            </svg>
          </button>
            </div>  
            </form>

          </div>
         </div>
          </div>

        </div>
    

        {loading ? (
          <>
            <p>Loading...</p>
            <div className="flex">
              <span className="loading loading-dots loading-xs"></span>
              <span className="loading loading-dots loading-sm"></span>
              <span className="loading loading-dots loading-md"></span>
              <span className="loading loading-dots loading-lg"></span>
            </div>
          </>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="flex flex-col items-center bg-white w-72 h-auto pt-5 pb-7 border border-gray-200 rounded-lg space-y-8">
                <section className="flex flex-col text-center space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-secondary">
                    {candidate.name}
                  </h3>
                  <p className="text-slate-500 text-sm">{candidate.party_full}</p>
                </section>
                <section className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-slate-500 text-sm">{`State: ${candidate.state}`}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 text-sm">{`Status: ${candidate.incumbent_challenge_full}`}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 text-sm">{`Office: ${candidate.office_full}`}</span>
                  </div>
                </section>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
