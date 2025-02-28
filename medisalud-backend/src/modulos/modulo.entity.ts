import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Periodo } from './periodos.entity';
import { Curso } from './curso.entity';
import { Profesor } from './profesor.entity';
import { Aula } from './aula.entity';
import { Horario } from './horario.entity';

@Entity('modulos')
export class Modulo {
    @PrimaryGeneratedColumn()
    id_modulo: number;

    @Column()
    codigo_modulo: string;

    @Column({ type: 'date' })
    fecha_inicio: Date;

    @Column({ type: 'date' })
    fecha_fin: Date;

    @Column({ type: 'int', nullable: true })
    capacidad_maxima: number;

    @Column()
    estado: string;

    @ManyToOne(() => Curso, (curso) => curso.modulos, { nullable: false })
    @JoinColumn({ name: 'id_curso' })
    curso: Curso;

    @ManyToOne(() => Periodo, (periodo) => periodo.modulos, { nullable: false })
    @JoinColumn({ name: 'id_periodo' })
    periodo: Periodo;

    @ManyToOne(() => Profesor, (profesor) => profesor.modulos, { nullable: false })
    @JoinColumn({ name: 'id_profesor' })
    profesor: Profesor;

    @ManyToOne(() => Aula, (aula) => aula.modulos, { nullable: true })
    @JoinColumn({ name: 'id_aula' })
    aula: Aula;

    @ManyToMany(() => Horario, (horario) => horario.modulos)
    horarios: Horario[];
}
