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

    const stateAbbr = {
        AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
        CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
        HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
        KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
        MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
        MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
        NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
        OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
        SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
        VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
        DC: 'District of Columbia', PR: 'Puerto Rico', GU: 'Guam', VI: 'U.S. Virgin Islands',
        MP: 'Northern Mariana Islands', AS: 'American Samoa'
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
            if (civicData.errors) {
                setError('Error finding address. Please try again.')
                return;
            } else {
                setError('');
            }
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
        <div className="bg-page text-primary min-h-screen">
            <nav className="sticky top-0 bg-[#F2F6F8] shadow-md ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-8">
                            
                            <a href='#urgent-dates' className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary hover:text-primary hover:border-primary">
                                Urgent Dates
                            </a>
                            <a href='#general-info' className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary hover:text-primary hover:border-primary">
                                General Information
                            </a>
                            <a href='#key-days' className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary hover:text-primary hover:border-primary">
                                Key Days
                            </a>
                            <a href='#candidates' className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary hover:text-primary hover:border-primary">
                                Candidates
                            </a>
                            <a href='#voting-resources' className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary hover:text-primary hover:border-primary">
                                Voting Resources
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-secondary shadow-lg rounded-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-center text-white mb-6">Search Election Information relevant to you</h1>
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                placeholder="1234 Street Address Rd, City, State"
                                className="w-full pr-20 text-lg border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </form>
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center my-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}

                {officials?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
                        {officials.map((official, i) => (
                            <div key={official.name + official.phones[0]} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-primary mb-2">{official.name}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{offices.find(office => office.officialIndices.includes(i)).name}</p>
                                    <img className='w-full h-48 object-cover mb-4 rounded' src={official.photoUrl || '/no_img_available.jpg'} alt={official.name} />
                                    <p className="text-sm text-gray-700 mb-2">{official.party}</p>
                                    {official.phones[0] && (
                                        <p className="text-sm text-gray-700 mb-2">Phone: {official.phones[0]}</p>
                                    )}
                                    {official.urls[0] && (
                                        <a href={official.urls[0]} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                            Official Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <section id="urgent-dates" className="my-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Urgent Dates</h2>
                    {electionDates.length > 0 ? (
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <ul className="space-y-4">
                                {electionDates.map((election, i) => (
                                    election.location === state && (
                                        <li key={election.event_id + election.start_date + i} className="border-b pb-4 last:border-b-0">
                                            <p className="font-semibold text-gray-700">{election.start_date}</p>
                                            <p className="text-gray-600">{election.description} {election.summary}</p>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-600">No elections in the near future...</p>
                    )}
                </section>

                <section id="general-info" className="my-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">General Information</h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-gray-700 mb-4">
                            The United States holds elections every two years, with the presidential election occurring every four years. During these elections, citizens vote for candidates running for various offices, including President, Congress, and local positions.
                        </p>
                        <p className="text-gray-700">
                            Election Day is a federal holiday, and voting is conducted across the country in local polling places. Voters can also use mail-in ballots or early voting options depending on their state's regulations.
                        </p>
                    </div>
                </section>

                <section id="key-days" className="my-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Days</h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
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
                    </div>
                </section>

                <section id="candidates" className="my-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Candidates</h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-gray-700 mb-4">
                            In each election cycle, various candidates run for different offices. Major parties, such as the Democratic and Republican parties, nominate candidates for President and Vice President. There are also numerous candidates running for Congressional seats, governorships, and local offices.
                        </p>
                        <p className="text-gray-700">
                            Each candidate's platform and policies can be researched through their official campaign websites and various news outlets.
                        </p>
                    </div>
                </section>

                <section id="voting-resources" className="my-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Voting Resources</h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <ul className="space-y-4">
                            <li>
                                <a href="https://www.fec.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Federal Election Commision 
                                </a>
                                <p className="text-gray-700">Official website for the independent regulatory agency involving federal campaigns of the United States of America.</p>
                            </li>
                            <li>
                                <a href="https://www.fvap.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Federal Voting Assistance Program
                                </a>
                                <p className="text-gray-700">Resources for military and overseas voters.</p>
                            </li>
                            <li>
                                <a href="https://www.eac.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    U.S. Election Assistance Commission
                                </a>
                                <p className="text-gray-700">Information on election assistance and resources.</p>
                            </li>
                            <li>
                                <a href="https://www.cnn.com/election" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    CNN Election Coverage
                                </a>
                                <p className="text-gray-700">Latest news and updates on elections.</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
            <div className="voteamerica-embed" data-subscriber="public" data-tool="upcoming"></div>
        </div>
    );
}