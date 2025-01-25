// pages/api/login.js
'use server';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const loginEndpoint = 'http://localhost:8888/auth/token';

export async function POST(request) {
  try {
    console.log('HAI')
    const { email, password } = await request.json();

    // Send login request to the backend server
    const response = await axios.post(loginEndpoint, { email, password });
    console.log(response.data.data.Token)
    const { Token } = response.data.data;

    console.log(Token)

    // Set token in cookies (valid for 2 hours)
    const cookie = serialize('access-token', Token, {
      httpOnly: false,
      maxAge: 2 * 60 * 60, // 2 hours in seconds
      path: '/',
    });

    // Return response with the token cookie
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    });
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ success: false, message: 'Login failed' }), {
      status: 401,
    });
  }
}