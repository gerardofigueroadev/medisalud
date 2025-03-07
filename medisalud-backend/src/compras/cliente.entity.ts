import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Compra } from './compra.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 255, nullable: true })
  direccion: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  nit: string;

  @OneToMany(() => Compra, (compra) => compra.cliente)
  compras: Compra[];
}
