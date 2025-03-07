import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Factura } from 'src/facturas/factura.entity';
import { DetalleCompra } from './detalle-compra.entity';

@Entity('compra')
export class Compra {
  @PrimaryGeneratedColumn()
  id_compra: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.compras)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ type: 'date' })
  fecha_compra: string;

  @Column({ type: 'decimal' })
  total: number;

  @Column()
  estado: string;

  @OneToMany(() => Factura, (factura) => factura.compra, { cascade: true })
  facturas: Factura[];

  @OneToMany(() => DetalleCompra, (detalle) => detalle.compra, { cascade: true })
  detalles: DetalleCompra[];
}
