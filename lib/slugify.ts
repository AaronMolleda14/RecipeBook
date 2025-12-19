// lib/slugify.ts

export function slugify(text: string): string {
    return text
      .toString()
      .normalize('NFD')                   // quita acentos
      .replace(/[\u0300-\u036f]/g, '')   // quita marcas Unicode
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')              // cambia espacios por guiones
      .replace(/[^\w\-]+/g, '')          // elimina caracteres no válidos
      .replace(/\-\-+/g, '-');           // colapsa múltiples guiones
  }
  