import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Curso } from './curso.entity';

@Entity('idiomas')
export class Idioma {
  @PrimaryGeneratedColumn()
  id_idioma: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Curso, (curso) => curso.idioma)
  cursos: Curso[];
}
