
// hooks/useVoteAmericaEmbed.ts
import { useEffect } from 'react';

export function useVoteAmericaEmbed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.voteamerica.org/embed/tools.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
}