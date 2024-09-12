import { NextResponse } from 'next/server';
import jokes from '../../../data/jokes.json';

export async function GET() {
  try {
    const randomIndex = Math.floor(Math.random() * jokes.jokes.length);
    const randomJoke = jokes.jokes[randomIndex];
    return NextResponse.json({ quote: randomJoke });
  } catch (error) {
    console.error('Error retrieving joke:', error);
    return NextResponse.json({ error: 'Error retrieving joke' }, { status: 500 });
  }
}