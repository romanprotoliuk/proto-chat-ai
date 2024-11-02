import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      messages: [
        { 
          role: 'system', 
          content: 'You are Grok, a chatbot inspired by the Hitchhiker\'s Guide to the Galaxy.' 
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ],
    });

    const message = completion.choices[0].message;
    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error communicating with xAI API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
