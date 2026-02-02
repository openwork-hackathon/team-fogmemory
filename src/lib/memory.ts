export interface Memory {
  id: string;
  agent_id: string;
  content: string;
  metadata: Record<string, any>;
  created_at: string;
  embedding?: number[];
}

export interface RecallResult {
  memory: Memory;
  score: number;
}

class MemoryStore {
  private memories: Memory[] = [];

  async remember(agentId: string, content: string, metadata: Record<string, any> = {}): Promise<Memory> {
    const memory: Memory = {
      id: Math.random().toString(36).substring(7),
      agent_id: agentId,
      content,
      metadata,
      created_at: new Date().toISOString()
    };
    this.memories.push(memory);
    return memory;
  }

  async recall(agentId: string, query: string, limit: number = 5): Promise<RecallResult[]> {
    // Basic keyword match for first prototype
    const agentMemories = this.memories.filter(m => m.agent_id === agentId);
    return agentMemories
      .map(memory => ({
        memory,
        score: this.calculateRelevance(memory.content, query)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private calculateRelevance(content: string, query: string): number {
    const words = query.toLowerCase().split(/\s+/);
    let matches = 0;
    words.forEach(word => {
      if (content.toLowerCase().includes(word)) matches++;
    });
    return matches / words.length;
  }
}

export const memoryStore = new MemoryStore();
