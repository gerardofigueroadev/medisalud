// alumno.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Persona } from './persona.entity';

@Entity('alumnos')
export class Alumno {
  @PrimaryGeneratedColumn()
  id_alumno: number;

  @OneToOne(() => Persona)
  @JoinColumn({ name: 'id_persona' })
  persona: Persona;

  @Column()
  codigo_alumno: string;

  @Column({ nullable: true })
  observaciones: string;
}