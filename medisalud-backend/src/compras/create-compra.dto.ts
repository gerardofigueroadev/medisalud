import { IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDetalleCompraDto {
  @IsNumber()
  @Type(() => Number)
  id_medidor: number; // Medidor comprado

  @IsNumber()
  @Type(() => Number)
  cantidad: number; // Cantidad de medidores

  @IsNumber()
  @Type(() => Number)
  precio_unitario: number; // Precio de cada medidor

  @IsNumber()
  @Type(() => Number)
  subtotal: number; // Cantidad * Precio unitario
}

export class CreateCompraDto {
  @IsNumber()
  @Type(() => Number)
  id_cliente: number; // Cliente que realiza la compra

  @IsString()
  fecha_compra: string; // Fecha de la compra

  @IsNumber()
  @Type(() => Number)
  total: number; // Total de la compra

  @IsString()
  estado: string; // Estado de la compra (Ejemplo: "Pagado", "Pendiente")

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleCompraDto)
  detalles: CreateDetalleCompraDto[]; // Lista de detalles de compra
}
