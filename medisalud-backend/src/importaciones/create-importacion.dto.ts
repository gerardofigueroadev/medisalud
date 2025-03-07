import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDetalleImportacionDto {
  @Type(() => Number) 
  @IsNumber()
  id_tipo_medidor: number;

  @Type(() => Number)
  @IsNumber()
  cantidad: number;

  @Type(() => Number)
  @IsNumber()
  precio_unitario: number;

  @Type(() => Number)
  @IsNumber()
  subtotal: number;
}

export class CreateImportacionDto {
  @IsString()
  nro_importacion: string;

  @IsString()
  fecha_importacion: string;

  @IsString()
  proveedor: string;

  @Type(() => Number) 
  @IsNumber()
  costo_total: number;

  @IsString()
  estado: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleImportacionDto)
  detalles: CreateDetalleImportacionDto[];
}
