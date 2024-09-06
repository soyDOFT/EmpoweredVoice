import { NextResponse } from 'next/server';

async function getDates(min_start_date = '', page = 1, perPage = 20) {
  try {
    const apiKey = process.env.OPENFEC_API_KEY;
    const baseUrl = 'https://api.open.fec.gov/v1/calendar-dates/';
    //&sort=start_date&calendar_category_id=36&location=North Carolina&min_start_date=2024-01-01

    // Building the API Request URL
    const params = new URLSearchParams({
      api_key: apiKey,
      sort: 'start_date',
      min_start_date,
      calendar_category_id: '36',
      page: page,
      per_page: perPage,
    });

    const url = `${baseUrl}?${params.toString()}`;

    // Making the API Request
    const response = await fetch(url);
    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error('Error fetching dates:', error);
    throw new Error('Failed to fetch dates');
  }
}

export async function POST(req) {
  try {
    const { state } = await req.json();

    // Handling Multiple Pages
    const dates = await Promise.all(
      Array.from({ length: 5 }, (_, i) => 
        getDates('2024-01-01', i + 1)
      )
    );
    // Combining the dates from the pages
    const combinedDates = dates.flat();

    // Constructing the Response
    return NextResponse.json({
      dates: combinedDates,
      totalResults: combinedDates.length,
      currentPage: 1,
      totalPages: Math.ceil(combinedDates.length / 20),
      hasMorePages: true,
    });
  } catch (error) {
    console.error('Error processing dates:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}