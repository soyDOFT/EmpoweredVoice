'use client'
import React, { useState } from 'react';
import { useVoteAmericaEmbed } from '@/hooks/useVoteAmericaEmbed';

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [officials, setOfficials] = useState([]);
    const [offices, setOffices] = useState([]);
    const [address, setAddress] = useState('');
    const [electionDates, setElectionDates] = useState([])
    const [state, setState] = useState('');
    const [location, setLocation] = useState('');

    const stateAbbr = {
        AL: 'Alabama',
        AK: 'Alaska',
        AZ: 'Arizona',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming',
        DC: 'District of Columbia',
        PR: 'Puerto Rico',
        GU: 'Guam',
        VI: 'U.S. Virgin Islands',
        MP: 'Northern Mariana Islands',
        AS: 'American Samoa'
      };
    
    useVoteAmericaEmbed();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/civicinfo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ address }),
            });
            const civicData = await response.json();
            setOfficials(civicData.officials);
            setOffices(civicData.offices);
            setState(stateAbbr[civicData.normalizedInput.state]);
        } catch (err) {
            setError('Error finding address. Please try again.');
        } finally {
            setLoading(false);
            getDates();
          }
    }

    async function getDates() {
        const response = await fetch('/api/fec/calendar/dates', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address }),
          });
          const data = await response.json();
          setElectionDates(data.dates);
    }

    return (
        <div className="bg-gray-100 text-gray-900">
            <nav className="bg-blue-200 p-4">
                <ul className="mt-12 flex space-x-4">
                    <li>
                        <a href="#general-info" className="text-blue-600 hover:underline">
                            General Information
                        </a>
                    </li>
                    <li>
                        <a href="#key-dates" className="text-blue-600 hover:underline">
                            Key Dates
                        </a>
                    </li>
                    <li>
                        <a href="#candidates" className="text-blue-600 hover:underline">
                            Candidates
                        </a>
                    </li>
                    <li>
                        <a href="#voting-resources" className="text-blue-600 hover:underline">
                            Voting Resources
                        </a>
                    </li>
                </ul>
            </nav>

            <main className="p-6">
                <div className="flex w-full flex-col lg:flex-row my-14">
                    <div className="card rounded-box grid h-32 flex-grow place-items-center text-secondary text-2xl  ">          
                        <h1>Search Election Information relevant to you</h1>
                        <div className="card bg-page rounded-box grid flex-grow place-items-center">
                        <div className="relative mt-6">
                            <form onSubmit={handleSubmit}>
                            <input value={address} onChange={(e) => {setAddress(e.target.value)}} type="text" placeholder="1234 Street Address Rd, City, State" className="block w-full rounded-2xl border border-secondary bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"/>
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
                        {officials.map((official, i) => (
                        <div key={official.name + official.phones[0]} className="flex flex-col items-center bg-white w-72 h-auto pt-5 pb-7 border border-gray-200 rounded-lg space-y-8">
                            <section className="flex flex-col text-center space-y-1">
                            <h3 className="text-2xl font-bold tracking-tight text-secondary">
                                {official.name}
                            </h3>
                            <div className="flex gap-2">
                                <span className="mx-auto text-slate-500 text-sm">{offices.find(office => office.officialIndices.includes(i)).name}</span>
                            </div>
                            <img className='max-h-48 mx-auto' src={official.photoUrl ? official.photoUrl : '/no_img_available.jpg'} alt={official.name}></img>
                            <p className="text-slate-500 text-sm">{official.party}</p>
                            </section>
                            <section className="space-y-2">
                            <div className="flex gap-2">
                                <span className="mx-auto text-slate-500 text-sm">{`Phone: ${official.phones[0]}`}</span>
                            </div>
                            <div className="flex gap-2">
                                <a href={official.urls[0]} target="_blank" className="mx-auto text-blue-500 text-sm">{`${official.urls[0].length > 20 ? official.urls[0].substring(0, 30) + '...' : official.urls[0]}`}</a>
                            </div>
                            </section>
                        </div>
                        ))}
                    </div>
                )}

                <section id="urgent-dates">
                    <h2 className="text-2xl font-semibold mb-2">Urgent Dates</h2>
                    {electionDates.length > 0 ? 
                    <ul>
                        {electionDates.map((election, i) => (
                            election.location == state && ( 
                            <li key={election.event_id + election.start_date + i}>
                                <p>{election.start_date}: {election.description} {election.summary} </p>
                            </li>
                        )))}
                    </ul>:
                    <p>No elections in the near future...</p>}
                </section>
                <section id="general-info" className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">General Information</h2>
                    <p>
                        The United States holds elections every two years, with the presidential election occurring every four years. During these elections, citizens vote for candidates running for various offices, including President, Congress, and local positions.
                    </p>
                    <p>
                        Election Day is a federal holiday, and voting is conducted across the country in local polling places. Voters can also use mail-in ballots or early voting options depending on their state’s regulations.
                    </p>
                </section>

                <section id="key-dates" className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Key Dates</h2>
                    <ul className="list-disc list-inside pl-5">
                        <li>
                            <strong>Primary Elections:</strong> Typically held in the months leading up to the general election, where parties select their candidates.
                        </li>
                        <li>
                            <strong>General Election Day:</strong> The first Tuesday after the first Monday in November.
                        </li>
                        <li>
                            <strong>Voter Registration Deadline:</strong> Varies by state, generally a few weeks before Election Day.
                        </li>
                        <li>
                            <strong>Early Voting Period:</strong> Often available in the weeks leading up to Election Day, depending on the state.
                        </li>
                    </ul>
                </section>

                <section id="candidates" className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Candidates</h2>
                    <p>
                        In each election cycle, various candidates run for different offices. Major parties, such as the Democratic and Republican parties, nominate candidates for President and Vice President. There are also numerous candidates running for Congressional seats, governorships, and local offices.
                    </p>
                    <p>
                        Each candidate’s platform and policies can be researched through their official campaign websites and various news outlets.
                    </p>
                </section>

                <section id="voting-resources">
                    <h2 className="text-2xl font-semibold mb-2">Voting Resources</h2>
                    <ul className="list-disc list-inside pl-5">
                        <li>
                            <a href="https://www.vote.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Vote.gov
                            </a> - Official website providing information on how to register and vote.
                        </li>
                        <li>
                            <a href="https://www.fvap.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Federal Voting Assistance Program
                            </a> - Resources for military and overseas voters.
                        </li>
                        <li>
                            <a href="https://www.eac.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                U.S. Election Assistance Commission
                            </a> - Information on election assistance and resources.
                        </li>
                        <li>
                            <a href="https://www.cnn.com/election" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                CNN Election Coverage
                            </a> - Latest news and updates on elections.
                        </li>
                    </ul>
                </section>
            </main>
            <div className="voteamerica-embed" data-subscriber="public" data-tool="upcoming"></div>
        </div>
    );
} 