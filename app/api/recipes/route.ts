// app/api/recipes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { slugify } from '@/lib/slugify';

await connectDB();

// GET todas las recetas
export async function GET() {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener recetas' }, { status: 500 });
  }
}

// POST crear nueva receta
export async function POST(req: NextRequest) {
  console.log('POST /api/recipes recibido');
  try {
    const data = await req.json();
    console.log('Datos recibidos en POST /api/recipes →', data);

    if (!data.title || !data.ingredients || !data.instructions) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const slug = slugify(data.title);

    const exists = await Recipe.findOne({ slug });
    if (exists) {
      return NextResponse.json({ error: 'Ya existe una receta con ese título' }, { status: 400 });
    }

    const newRecipe = await Recipe.create({
      slug,
      title: data.title,
      description: data.description || '',
      image: data.image || '',
      ingredients: data.ingredients,
      instructions: data.instructions,
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear la receta' }, { status: 500 });
  }
}

