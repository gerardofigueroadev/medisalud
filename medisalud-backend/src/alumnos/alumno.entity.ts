// alumno.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Persona } from './persona.entity';

@Entity('alumnos')
export class Alumno {
  @PrimaryGeneratedColumn()
  id_alumno: number;

  @ManyToOne(() => Persona, { eager: true }) // Cargar automáticamente la relación
  @JoinColumn({ name: 'id_persona' }) // Especificar la columna de unión
  persona: Persona;

  @Column()
  codigo_alumno: string;

  @Column({ nullable: true })
  observaciones: string;
}