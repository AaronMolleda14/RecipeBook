import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  const { user, password, key } = await req.json();

  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Clave de administrador incorrecta" }, { status: 401 });
  }

  await connectDB();

  const exists = await Admin.findOne({ user });
  if (exists) return NextResponse.json({ error: "Usuario ya existe" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ user, password: hashed });

  return NextResponse.json({ message: "Administrador creado" });
}
