import { NextResponse } from 'next/server';

async function getOfficials(address = 'Charlotte NC') {
  try {
    const baseUrl = 'https://civicinfo.googleapis.com/civicinfo/v2/representatives';
    //'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=3900%20havenwood%20rd%20charlotte%20NC&includeOffices=true&key=AIzaSyAE51vhVfYMaEDWxBz2h2SIuq3T1NythMU' \
    //'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=3900+havenwood+rd+charlotte+NC&includeOffices=true&key=AIzaSyAE51vhVfYMaEDWxBz2h2SIuq3T1NythMU'


    // Building the API Request URL
    const params = new URLSearchParams({
        address,
        includeOffices: true,
        key: process.env.GOOGLE_CIVIC_KEY,
    });

    const url = `${baseUrl}?${params.toString()}`;

    // Making the API Request
    const response = await fetch(url);
    const data = await response.json();

    return data || [];
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw new Error('Failed to fetch candidates');
  }
}

export async function POST(req) {
  try {
    const { address } = await req.json();
    console.log(address);
    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    // Handling Multiple Pages
    const data = await getOfficials(address)
    console.log(data);
    // Constructing the Response
    return NextResponse.json({
      officials: data.officials,
      offices: data.offices,
      totalResults: data.officials.length,
      currentPage: 1,
      totalPages: Math.ceil(data.officials.length / 20),
      hasMorePages: true,
      normalizedInput: data.normalizedInput
    });
  } catch (error) {
    console.error('Error processing officials:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}