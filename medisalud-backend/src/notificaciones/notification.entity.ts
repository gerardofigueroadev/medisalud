import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../login/usuario.entity';
import { Pedido } from '../pedidos/pedidos.entity';

@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  mensaje: string;

  @Column({ type: 'timestamp' })
  fecha_hora: Date;

  @Column()
  leida: boolean;

  @Column()
  destinatario_id: number;

  @Column()
  pedido_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'destinatario_id' })
  destinatario: Usuario;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;
}
