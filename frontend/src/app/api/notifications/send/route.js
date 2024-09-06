import { NextResponse } from 'next/server';
import { sns } from '@/app/_lib/aws';
import { auth } from '@/app/_lib/auth'

export async function POST(req) {
    const session = await auth();
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
  try {
    const body = await req.json();
    const { subject, message } = body;

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 });
    }

    const params = {
      Message: message, // The message you want to send
      Subject: subject, // Subject of the message
      TopicArn: process.env.SNS_TOPIC_ARN, // Your SNS Topic ARN
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