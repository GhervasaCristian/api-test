import { NextRequest, NextResponse } from "next/server";
import { getUserByUsername } from "shared/db";

// Verifica existenta unui user (GET prin search params: ?username=...)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  
  if (!username) return NextResponse.json({ message: "Lipsă username" }, { status: 400 });
  
  const user = getUserByUsername(username);
  if (user) {
    return NextResponse.json({ message: `Utilizatorul ${username} există!`, exists: true }, { status: 200 });
  } else {
    return NextResponse.json({ message: `Utilizatorul ${username} este disponibil.`, exists: false }, { status: 200 });
  }
}