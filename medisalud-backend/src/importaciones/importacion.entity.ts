import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetalleImportacion } from './detalle-importacion.entity';

@Entity('importacion')
export class Importacion {
  @PrimaryGeneratedColumn()
  id_importacion: number;

  @Column({ length: 50 })
  nro_importacion: string;

  @Column({ type: 'date' })
  fecha_importacion: string;

  @Column({ length: 100 })
  proveedor: string;

  @Column({ type: 'decimal' })
  costo_total: number;

  @Column({ length: 20 })
  estado: string;

  @OneToMany(() => DetalleImportacion, (detalle) => detalle.importacion, { cascade: true })
  detalles: DetalleImportacion[];
}
