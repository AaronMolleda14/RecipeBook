// lib/mongodb.ts

// Importacion de mongoose.
import mongoose from 'mongoose';

// Lee la URI de conexion desde el archivo de variables de entorno.
const MONGODB_URI = process.env.MONGODB_URI || '';

// Mensaje de error en caso de no asignar la variable de entorno.
if (!MONGODB_URI) {
  throw new Error('Por favor define la variable MONGODB_URI en .env.local');
}

// Variable que guarda la conexion en memoria.
let cached = (global as any).mongoose;

// Si no hay nada en cached se inicializa con la conexion establecida y la promesa de conexion.
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Funcion principal de la conexion.
async function connectDB() {
  // Si ya existe una conexion activa se reutiliza.
  if (cached.conn) {
    console.log('Conexión reutilizada a MongoDB');
    return cached.conn;
  }

  // Si no hay una promesa en curso se crea una.
  if (!cached.promise) {
    console.log('Conectando a MongoDB...');

    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
    .then((mongoose) => {
      console.log('Conexión exitosa')
      return mongoose;
    })
    .catch((err) => {
      console.log('Error al conectar a MongoDB: ', err.message);
      throw err;
    });
  }

  // Espera a que la conexion este lista y se devuelve.
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;