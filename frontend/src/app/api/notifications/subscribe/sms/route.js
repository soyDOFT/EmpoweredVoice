import { NextResponse } from 'next/server';
import { sns } from '@/app/_lib/aws';

// POST request handler
export async function POST(req) {
  try {
    const body = await req.json();
    const { phoneNumber } = body;
    if (!phoneNumber) {
      return NextResponse.json({ error: 'SMS-enabled phone number is required' }, { status: 400 });
    }

    // Set parameters for subscribing to SNS
    const params = {
      Protocol: 'sms', // Subscription type
      TopicArn: process.env.SNS_TOPIC_ARN, // The SNS topic ARN from your environment variables
      Endpoint: phoneNumber, // The email address to subscribe
    };

    // Subscribe the email to the topic
    const data = await sns.subscribe(params).promise();
    
    return NextResponse.json({
      message: 'Subscription request sent. Please check your texts to confirm the subscription.',
      data,
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}