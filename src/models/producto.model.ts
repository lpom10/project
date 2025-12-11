import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { CategoriaProducto } from '../types/producto.types.js';

export class ProductoModel extends Model<
  InferAttributes<ProductoModel>,
  InferCreationAttributes<ProductoModel>
> {
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare descripcion: string;
  declare categoria: CategoriaProducto;
  declare precio: number;
  declare stock: number;
  declare activo: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ProductoModel.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    categoria: { type: DataTypes.ENUM('frutas', 'verduras', 'lacteos', 'carnes', 'panaderia', 'bebidas', 'otros'), allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
  },
  {
    sequelize,
    tableName: 'productos',
    timestamps: true,
    underscored: true
  }
);

export default ProductoModel;