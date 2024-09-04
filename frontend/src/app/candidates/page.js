"use client";

import React, { useState } from 'react';

export default function Page() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState('');

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

      <div className="bg-secondary text-white text-2xl h-96 grid place-items-center mt-32">
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
        <div className='flex'>
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