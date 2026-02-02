import { NextResponse } from 'next/server';
import { memoryStore } from '@/lib/memory';

export async function POST(request: Request) {
  try {
    const { agent_id, content, metadata } = await request.json();
    
    if (!agent_id || !content) {
      return NextResponse.json({ error: 'Missing agent_id or content' }, { status: 400 });
    }

    const memory = await memoryStore.remember(agent_id, content, metadata);
    return NextResponse.json({ success: true, memory });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
