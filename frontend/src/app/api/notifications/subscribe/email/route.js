import { NextResponse } from 'next/server';
import { sns } from '@/app/_lib/aws';

// POST request handler
export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;
    console.log('email6543', email);
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Set parameters for subscribing to SNS
    console.log('sns topic', process.env.SNS_TOPIC_ARN)
    const params = {
      Protocol: 'email', // Subscription type
      TopicArn: process.env.SNS_TOPIC_ARN, // The SNS topic ARN from your environment variables
      Endpoint: email, // The email address to subscribe
    };

    // Subscribe the email to the topic
    const data = await sns.subscribe(params).promise();

    return NextResponse.json({
      message: 'Subscription request sent. Please check your email to confirm the subscription.',
      data,
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}