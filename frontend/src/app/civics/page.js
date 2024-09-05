'use client'

import { useVoteAmericaEmbed } from '@/hooks/useVoteAmericaEmbed';

export default function Page() {
    
    useVoteAmericaEmbed()

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
                <section id="urgent-dates">
                    <h2 className="text-2xl font-semibold mb-2">Urgent Dates</h2>
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
            <div class="voteamerica-embed" data-subscriber="public" data-tool="upcoming"></div>
        </div>
    );
} 