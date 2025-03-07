import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Compra } from 'src/compras/compra.entity';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @ManyToOne(() => Compra, (compra) => compra.facturas)
  @JoinColumn({ name: 'id_compra' })
  compra: Compra;

  @Column({ length: 50 })
  nro_factura: string;

  @Column({ type: 'date' })
  fecha_emision: string;

  @Column({ type: 'decimal' })
  monto_total: number;

  @Column({ length: 20 })
  estado: string;
}
