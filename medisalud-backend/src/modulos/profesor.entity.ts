import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Modulo } from './modulo.entity';
import { Persona } from 'src/alumnos/persona.entity';

@Entity('profesores')
export class Profesor {
    @PrimaryGeneratedColumn()
    id_profesor: number;

    @Column()
    especialidad: string;

    @ManyToOne(() => Persona, { eager: true })  // Relación con Persona
    @JoinColumn({ name: 'id_persona' })
    persona: Persona;

    @OneToMany(() => Modulo, (modulo) => modulo.profesor)
    modulos: Modulo[];
}
