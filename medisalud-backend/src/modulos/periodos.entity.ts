import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Modulo } from './modulo.entity';

@Entity('periodos')
export class Periodo {
  @PrimaryGeneratedColumn()
  id_periodo: number;

  @Column()
  nombre: string;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;

  @OneToMany(() => Modulo, (modulo) => modulo.periodo)
  modulos: Modulo[];
}