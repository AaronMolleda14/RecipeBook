// app/api/recipes/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Recipe from '@/models/Recipe';

await connectDB();

// Obtener una receta por slug
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const recipe = await Recipe.findOne({ slug });
    if (!recipe) {
      return NextResponse.json({ error: 'Receta no encontrada' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener la receta' }, { status: 500 });
  }
}

// Actualizar una receta por slug
export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await req.json();

  try {
    const updated = await Recipe.findOneAndUpdate(
      { slug },
      data,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Receta no encontrada' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar la receta' }, { status: 500 });
  }
}

// Eliminar una receta por slug
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const deleted = await Recipe.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json({ error: 'Receta no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar la receta' }, { status: 500 });
  }
}
