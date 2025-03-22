import { IsInt, IsString, IsBoolean, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  numero_pedido: number;

  @IsDateString()
  fecha_hora: string;  // El tipo es 'string' pero debe ser una fecha válida en formato ISO 8601

  @IsString()
  estado: string;

  @IsBoolean()
  para_llevar: boolean;

  @IsNumber()
  total: number;  // Este campo debe ser un número, no un string

  @IsOptional()  // mesa_numero es opcional
  @IsInt()
  mesa_numero?: number;

  @IsInt()
  usuario_id: number;
}
