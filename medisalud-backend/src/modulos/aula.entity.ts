import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Modulo } from './modulo.entity';

@Entity('aulas')
export class Aula {
  @PrimaryGeneratedColumn()
  id_aula: number;

  @Column()
  numero: string;

  @OneToMany(() => Modulo, (modulo) => modulo.aula)
  modulos: Modulo[];
}