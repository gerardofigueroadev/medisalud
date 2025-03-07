export class CompraDto {
    id_compra: number;
    fecha_compra: string;
    total: number;
    estado: string;
    cliente: {
      id_cliente: number;
      nombre: string;
      apellido: string;
      direccion: string;
      telefono: string;
      email: string;
      nit: string;
    };
  }
  