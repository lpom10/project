// zod: es un validador de esquemas para TypeScript y JavaScript
// trim, vacia los espacios de izquierda y derecha _charlie_cardenas_ trim = charlie_cardenas 
import { z } from "zod";
import { CATEGORIAS_PRODUCTOS } from "../types/producto.type";

export const productoCreateSchema = z.object({
    //validador de schemas
    nombre: z.string().min(3).max(100).trim(),
    descripcion: z.string().min(10).max(100).trim(),
    categoria: z.enum(CATEGORIAS_PRODUCTOS),
    precio: z.number().positive().min(0).max(999.99),
    stock: z.number().int().nonnegative(),
    activo: z.boolean().optional().default(true)


});

export const productoUpdateSchema = productoCreateSchema.partial();

