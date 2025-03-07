export class MedidorDto {
    id_medidor: number;
    numero_serie: string;
    marca: string;
    modelo: string;
    estado: string;
    sistema_seguridad: boolean;
    fecha_fabricacion: string;
    fecha_calibracion?: string;
    valores_calibracion?: string;
    tipo_medidor: {
      id_tipo_medidor: number;
      nombre: string;
      descripcion: string;
    };
    precios: {
      id_precio: number;
      sistema_seguridad: boolean;
      valor_usd: number;
      fecha_vigencia: string;
      estado: string;
    }[];
  }
  