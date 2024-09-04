"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function Page() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState('');
  const [counter, setCounter] = useState(99);  
  // Update countdown value
  const countdownRef = useRef(null);

  useEffect(() => {
    if (countdownRef.current) {
      const validValue = Math.max(0, Math.min(99, counter));
      countdownRef.current.style.setProperty('--value', validValue);
    }
  }, [counter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentPresidentialCandidates = [
    { name: 'Kamala Harris', party: 'Democratic', state: 'CA', office: 'President', imageUrl: '/presidential-candidates/kamala.webp', description: 'Current Vice President of the United States.' },
    { name: 'Donald Trump', party: 'Republican', state: 'FL', office: 'President', imageUrl: '/presidential-candidates/donald-trump.jpg', description: 'Former President of the United States.' },
    { name: 'Chase Oliver', party: 'Libertarian', state: 'FL', office: 'President', imageUrl: '/presidential-candidates/chase-oliver.png', description: 'Libertarian candidate for President in 2024.' },
    { name: 'Jill Stein', party: 'Green', state: 'MA', office: 'President', imageUrl: '/presidential-candidates/jill-stein.jpg', description: 'Former Green Party candidate for President and environmental activist.' },
    { name: 'Cornel West', party: 'Independent', state: 'NY', office: 'President', imageUrl: '/presidential-candidates/cornel-west.webp', description: 'Independent candidate and prominent philosopher.' },
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
        {/* Hard-coded presidential candidates section */}
        <div className="candidate-hero flex flex-col justify-center items-center text-white text-2xl h-48">
        <h2 className='text-7xl text-center mb-8'>Countdown to the <br></br>2024 presidential election</h2>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 61 }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 21 }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 24 }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl" ref={countdownRef}>
                <span></span>
              </span>
              sec
            </div>
          </div>
          <button className="btn  text-white border-none bg-primary mt-4  max:mt-20 max:w-40 max:text-2xl hover:bg-secondary hover:text-white">Meet the candidates</button>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4">
          {currentPresidentialCandidates.map((candidate, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-xl">
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

        <div className="bg-secondary text-white text-2xl h-96 grid place-items-center mt-8">
          <h1>Meet the Candidates running for office in your state</h1>
        </div>
        <div className="divider"></div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter state abbreviation (e.g., NC)"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

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
          <div className="grid grid-cols-3 gap-4">
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
