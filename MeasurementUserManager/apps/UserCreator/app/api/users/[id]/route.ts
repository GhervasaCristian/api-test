import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "shared/db";

// Pentru GET by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getUserById(id);
  if (!user) return NextResponse.json({ message: "Nu a fost găsit" }, { status: 404 });
  return NextResponse.json(user, { status: 200 });
}

// Pentru PUT (Update)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = updateUser(id, body);
    if (!updated) return NextResponse.json({ message: "Utilizator inexistent" }, { status: 404 });
    
    return NextResponse.json({ message: "Actualizat cu succes", user: updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Eroare la actualizare" }, { status: 500 });
  }
}

// Pentru DELETE
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const success = deleteUser(id);
  if (!success) return NextResponse.json({ message: "Nu a fost găsit" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}