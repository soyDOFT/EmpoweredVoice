import { NextResponse } from 'next/server';
import { sns } from '@/app/_lib/aws';

export async function POST(req) {
  try {
    const body = await req.json();
    const { subject, message } = body;

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 });
    }

    const params = {
      Message: message, // The message you want to send
      Subject: subject, // Subject of the message
      TopicArn: process.env.SNS_TOPIC_ARN,
    };

    // Publish the message to SNS
    const result = await sns.publish(params).promise();

    return NextResponse.json({
      success: true,
      message: 'Notification sent successfully',
      result,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}