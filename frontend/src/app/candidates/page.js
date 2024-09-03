"use client";

import React, { useState, useEffect } from 'react';

export default function Page() {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    const res = await fetch('http://localhost:3000/api/fec');
    const data = await res.json();
    setCandidates(data.candidates);
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="bg-secondary text-white text-2xl h-96 grid place-items-center mt-32">
          <h1>Meet the Candidates running for office in your state</h1>
        </div>
        <div className="divider"></div>
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
                  <span className="text-slate-500 text-sm">{candidate.state}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 text-sm">{candidate.incumbent_challenge_full}</span>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
