'use client'

import { useVoteAmericaEmbed } from '@/hooks/useVoteAmericaEmbed';

function page() {
    useVoteAmericaEmbed();

    return (
        <>
            <div className="voteamerica-embed" data-subscriber="public" data-tool="register"></div>
        </>
    )
}

export default page
