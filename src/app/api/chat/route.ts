import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    // Make a request to the Flask server
    const response = await axios.post('http://localhost:5000/generate_sql', {
      prompt: message
    });

    // Return the SQL query from the Flask server
    return NextResponse.json({ response: response.data.sql_query });
    
  } catch (error) {
    console.error("Error in AI response:", error);
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
  }
}