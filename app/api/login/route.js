// pages/api/login.js
'use server';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const loginEndpoint = 'http://localhost:8888/auth/token';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const response = await axios.post(loginEndpoint, { email, password });
    const { Token, User_Id } = response.data.data;

    const tokenCookie = serialize('dms-token', Token, {
      httpOnly: false,
      maxAge: 2 * 60 * 60, // 2 hours
      path: '/',
    });

    const userIdCookie = serialize('dms-user-id', User_Id, {
      httpOnly: false,
      maxAge: 2 * 60 * 60, // 2 hours
      path: '/',
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Set-Cookie': [tokenCookie, userIdCookie], // Set multiple cookies
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ success: false, message: 'Login failed' }), {
      status: 401,
    });
  }
}
