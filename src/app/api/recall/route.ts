import { NextResponse } from 'next/server';
import { memoryStore } from '@/lib/memory';

export async function POST(request: Request) {
  try {
    const { agent_id, query, limit } = await request.json();
    
    if (!agent_id || !query) {
      return NextResponse.json({ error: 'Missing agent_id or query' }, { status: 400 });
    }

    const results = await memoryStore.recall(agent_id, query, limit);
    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
