'use client'

import { useVoteAmericaEmbed } from '@/hooks/useVoteAmericaEmbed';

function page() {
    useVoteAmericaEmbed();

    return (
        <>
            <div className="voteamerica-embed 320Max:mt-32" data-subscriber="public" data-tool="register"></div>
        </>
    )
}

export default page
