import { IsString, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFacturaDto {
  @IsNumber()
  @Type(() => Number)
  id_compra: number; // La compra a la que pertenece la factura

  @IsString()
  nro_factura: string; // Número de la factura

  @IsDateString()
  fecha_emision: string; // Fecha en formato ISO (YYYY-MM-DD)

  @IsNumber()
  @Type(() => Number)
  monto_total: number; // Monto total de la factura

  @IsString()
  estado: string; // Estado de la factura (Ejemplo: "Emitida", "Pendiente")
}
