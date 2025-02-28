import { Entity, ManyToMany, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Modulo } from './modulo.entity';

@Entity('horarios')
export class Horario {
    @PrimaryGeneratedColumn()
    id_horario: number;

    @Column()
    dia_semana: string;

    @Column({ type: 'time' })
    hora_inicio: string;

    @Column({ type: 'time' })
    hora_fin: string;

    @ManyToMany(() => Modulo, (modulo) => modulo.horarios)
    @JoinTable({
        name: 'modulo_horario', // Nombre de la tabla intermedia
        joinColumn: { name: 'id_horario', referencedColumnName: 'id_horario' },
        inverseJoinColumn: { name: 'id_modulo', referencedColumnName: 'id_modulo' }
    })
    modulos: Modulo[];
}
