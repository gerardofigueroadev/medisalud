// persona.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Alumno } from './alumno.entity';

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn()
  id_persona: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ nullable: true })
  tipo_documento: string;

  @Column()
  nro_documento: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @Column({ default: true })
  activo: boolean;

  @OneToOne(() => Alumno, alumno => alumno.persona)
  alumno: Alumno;
}