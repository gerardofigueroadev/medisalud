import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password_hash: string;

  @Column()
  nombre: string;

  @Column()
  rol: string;

  @Column({ type: 'timestamp', nullable: true })
  ultimo_acceso: Date;

  @Column()
  activo: boolean;
}
