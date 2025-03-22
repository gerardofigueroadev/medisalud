import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../pedidos/pedidos.entity';

@Entity('facturas')
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pedido_id: number;

  @Column()
  numero_factura: number;

  @Column({ type: 'timestamp' })
  fecha_emision: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  impuestos: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  metodo_pago: string;

  @Column()
  estado_pago: string;

  // Relación con pedido (opcional, si quieres incluir el objeto completo)
  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;
}
