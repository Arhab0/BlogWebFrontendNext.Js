// src/app/api/proxy/route.js
import { NextResponse } from "next/server";

export async function GET(req:any) {
  const url = new URL(req.url);
  const targetUrl = "http://bog.runasp.net" + url.search; // forward query params

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req:any) {
  const body = await req.json();
  const targetUrl = "http://bog.runasp.net";

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
