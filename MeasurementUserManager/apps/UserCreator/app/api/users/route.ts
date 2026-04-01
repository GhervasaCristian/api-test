import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, createUser, getUserByUsername } from "shared/db";

// list all
export async function GET() {
  return NextResponse.json(getAllUsers(), { status: 200 });
}

// create user
export async function POST(req: NextRequest) {
  try {
    const { username, password, email } = await req.json();
    
    if (getUserByUsername(username)) {
      return NextResponse.json({ message: "exists" }, { status: 400 });
    }

    const user = createUser(username, password, email);
    return NextResponse.json({ message: "ok", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "err" }, { status: 500 });
  }
}