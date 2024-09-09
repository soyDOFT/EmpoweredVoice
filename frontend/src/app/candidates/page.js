"use client";

import React, { useState, useEffect } from 'react';
import Countdown from '@/components/Countdown';


export default function Page() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState('');

  const currentPresidentialCandidates = [
    { name: 'Kamala Harris', party: 'Democratic', state: 'CA', office: 'President', imageUrl: '/presidential-candidates/kamala.webp', description: 'Current Vice President of the United States.',keyPositions: 'Supports strengthening the middle class, expanding access to affordable healthcare, advocating for gun control measures, and protecting the rights of workers to unionize.',link: 'https://kamalaharris.com/'},
    { name: 'Donald Trump', party: 'Republican', state: 'FL', office: 'President', imageUrl: '/presidential-candidates/donald-trump.jpg', description: 'Former President of the United States.', keyPositions: 'Plans to reduce the size of the federal government, reform federal agencies, adjust social safety net programs, and has expressed intent to investigate alleged political corruption.', link: 'https://www.donaldjtrump.com/'},
    { name: 'Chase Oliver', party: 'Libertarian', state: 'FL', office: 'President', imageUrl: '/presidential-candidates/chase-oliver.png', description: 'Libertarian candidate for President in 2024.', keyPositions: 'Advocates for simplifying immigration processes, reducing US involvement in foreign conflicts, decriminalizing marijuana and other drugs, and eliminating the Federal Reserve.', link: 'https://votechaseoliver.com/'},
    { name: 'Jill Stein', party: 'Green', state: 'MA', office: 'President', imageUrl: '/presidential-candidates/jill-stein.jpg', description: 'Former Green Party candidate for President and environmental activist.', keyPositions: 'Proposes aggressive climate action, free public education, canceling medical debt, and reforming the Supreme Court with term limits and increased seats.', link: 'https://www.jillstein2024.com/'},
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get('state');
    if (stateParam) {
      console.log(stateParam);
      handleLoad(stateParam);
    }
  }, []);

  const handleLoad = async (state) => {
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
        <h2 className='text-7xl text-center font-bold mb-8 phoneMax:text-5xl'>Countdown to the <br></br>2024 presidential election</h2>
        <Countdown />
        <a href="#candidates" className="btn text-white border-none bg-primary mt-4 max:mt-20 text-xl hover:bg-[#1803fe] hover:text-white">
          Meet the candidates
        </a>
        </div>
        <div id='candidates' className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 mt-14 mb-14">
        {currentPresidentialCandidates.map((candidate, index) => (
          <div key={index} className="card bg-base-100 w-80 shadow-xl relative group overflow-hidden">
            <figure className="px-10 pt-10">
              <img
                src={candidate.imageUrl}
                alt={candidate.name}
                className="rounded-xl h-60 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-secondary">{candidate.name}</h2>
              <p className="font-bold text-slate-700">{candidate.party}</p>
              <p className="text-slate-600">{candidate.description}</p>
            </div>
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-secondary text-xl font-bold">Key Policy issues</h3>
              <p className="text-black text-lg mt-2 px-4 text-center">{candidate.keyPositions}</p>
              <a href={candidate.link} target='blank' className='btn w-full sm:w-auto rounded-xl  text-white border-none bg-primary mt-4 max:mt-20 text-xl hover:bg-[#1803fe] h-12'>Learn more</a>
            </div>
          </div>
        ))}
      </div>


        <div className="flex w-full flex-col lg:flex-row my-14">
          <div className="card rounded-box grid h-32 flex-grow place-items-center text-secondary text-2xl  ">          
            <h1>Search Candidates running for office in your state</h1>
            <div className="card bg-page rounded-box grid flex-grow place-items-center">
              <div className="relative mt-6">
                <form onSubmit={handleSubmit}>
                  <input type="text" placeholder="NC" value={state} onChange={(e) => setState(e.target.value)} className="block w-full rounded-2xl border border-secondary bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"/>
                  <div className="absolute inset-y-1 right-1 flex justify-end">
                    <button type="submit" aria-label="Submit" className="flex aspect-square h-full items-center justify-center rounded-xl bg-primary text-white transition hover:bg-secondary">
                    <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
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
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  gap-4 justify-items-center my-14">
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
