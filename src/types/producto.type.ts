export const CATEGORIAS_PRODUCTOS = [
    'frutas',
    'verduras',
    'carnes',
    'lacteos'
];

export type CategoriaProducto = typeof CATEGORIAS_PRODUCTOS[number];

export interface Producto{
    id: number;
    nommbre: string;
    descripcion: string;
    categoria: CategoriaProducto;
    precio: number;
    stock: number;
    activo: boolean;
    fechaCreacion: Date;
    fechaActualizacion: Date;

}

