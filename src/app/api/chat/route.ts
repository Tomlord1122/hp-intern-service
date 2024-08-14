import { NextRequest, NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    const response = await ollama.chat({
      model: "llama3.1",
      messages: [{ role: "user", content: message }],
      stream: true
    });
    const responseChunks : string[] = [];
    for await (const chunk of response) {
      responseChunks.push(chunk.message.content);
    }
    return NextResponse.json({ response: responseChunks.join("") });
    
  } catch (error) {
    console.error("Error in AI response:", error);
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
  }
}