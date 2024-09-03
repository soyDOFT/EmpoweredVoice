
import { NextResponse } from 'next/server';

async function getCandidates(page = 1, perPage = 20) {
  try {
    const apiKey = process.env.OPENFEC_API_KEY;
    const baseUrl = 'https://api.open.fec.gov/v1/candidates/';
    
    //Building the API Request URL
    const params = new URLSearchParams({
      api_key: apiKey,
      election_year: '2024',
      candidate_status: 'C',
      cycle: '2024',
      is_active_candidate: 'true',
      page: page,
      per_page: perPage,
      state: 'NC',
      sort: 'party',
      year: '2024',  
    });

    const url = `${baseUrl}?${params.toString()}`;

    //Making the API Request
    const response = await fetch(url);
    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw new Error('Failed to fetch candidates');
  }
}

export async function GET() {
  try {

    //Handling Multiple Pages
    const candidates = await Promise.all(
      Array.from({ length: 5 }, (_, i) => 
        getCandidates(i + 1)
      )
    );

    //Combining the candidates from the pages
    const combinedCandidates = candidates.flat();

    //Constructing the Response
    return NextResponse.json({
      candidates: combinedCandidates,
      totalResults: combinedCandidates.length,
      currentPage: 1,
      totalPages: Math.ceil(combinedCandidates.length / 20),
      hasMorePages: false
    });
  } catch (error) {
    console.error('Error processing candidates:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}