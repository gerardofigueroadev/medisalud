import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Compra } from './compra.entity';
import { Medidor } from 'src/medidores/medidor.entity';

@Entity('detalle_compra')
export class DetalleCompra {
  @PrimaryGeneratedColumn()
  id_detalle_compra: number;

  @ManyToOne(() => Compra, (compra) => compra.detalles)
  @JoinColumn({ name: 'id_compra' })
  compra: Compra;

  @ManyToOne(() => Medidor)
  @JoinColumn({ name: 'id_medidor' })
  medidor: Medidor;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal' })
  precio_unitario: number;

  @Column({ type: 'decimal' })
  subtotal: number;
}
