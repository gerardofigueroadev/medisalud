import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from 'typeorm';
import { Modulo } from '../modulos/modulo.entity';
import { Alumno } from '../alumnos/alumno.entity'

@Entity('inscripciones')
export class Inscripcion {
    @PrimaryGeneratedColumn()
    id_inscripcion: number;

    @ManyToOne(() => Alumno, { eager: true })
    @JoinColumn({ name: 'id_alumno' })
    alumno: Alumno;

    @ManyToOne(() => Modulo, { eager: true })
    @JoinColumn({ name: 'id_modulo' })
    modulo: Modulo;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_inscripcion: Date;
}
