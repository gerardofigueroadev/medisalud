import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Importacion } from './importacion.entity';
import { TipoMedidor } from 'src/medidores/tipo-medidor.entity';

@Entity('detalle_importacion')
export class DetalleImportacion {
  @PrimaryGeneratedColumn()
  id_detalle_importacion: number;

  @ManyToOne(() => Importacion, (importacion) => importacion.detalles)
  @JoinColumn({ name: 'id_importacion' })
  importacion: Importacion;

  @ManyToOne(() => TipoMedidor)
  @JoinColumn({ name: 'id_tipo_medidor' })
  tipoMedidor: TipoMedidor;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal' })
  precio_unitario: number;

  @Column({ type: 'decimal' })
  subtotal: number;
}
