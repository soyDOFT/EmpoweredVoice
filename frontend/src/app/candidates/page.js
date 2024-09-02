"use client";

import React, {useState} from 'react'

export default async function Page() {
  const [candidates, setCandidates] = useState([]);
  
  const fetchCandidates = async () => {
    const res = await fetch('http://localhost:3000/api/fec')
    const data = await res.json();
    setCandidates(data.candidates)
  }
  
  React.useEffect(() => {
    fetchCandidates();
  }, [])

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center"><h1>Candidates running for office in your state</h1></div>
        <div className="divider"></div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Party</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td><h3>{candidate.name}</h3></td>
                  <td><p>{candidate.party_full}</p></td>
                  <td><p>{candidate.state}</p></td>
                  <td><p>{candidate.incumbent_challenge_full}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
