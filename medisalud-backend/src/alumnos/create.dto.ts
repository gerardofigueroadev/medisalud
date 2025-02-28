export class CreatePersonaAlumnoDto {
    nombre: string;
    apellido: string;
    tipo_documento?: string;
    nro_documento: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    fecha_registro?: Date;
    activo?: boolean;
    codigo_alumno: string;
    observaciones?: string;
  }