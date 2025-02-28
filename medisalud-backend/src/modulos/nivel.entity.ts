import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Curso } from './curso.entity';

@Entity('niveles')
export class Nivel {
  @PrimaryGeneratedColumn()
  id_nivel: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Curso, (curso) => curso.nivel)
  cursos: Curso[];
}
