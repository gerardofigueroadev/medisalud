export class ImportacionDto {
    id_importacion: number;
    nro_importacion: string;
    fecha_importacion: string;
    proveedor: string;
    costo_total: number;
    estado: string;
    detalles: {
      id_detalle_importacion: number;
      tipo_medidor: {
        id_tipo_medidor: number;
        nombre: string;
        descripcion: string;
      };
      cantidad: number;
      precio_unitario: number;
      subtotal: number;
    }[];
  }
  