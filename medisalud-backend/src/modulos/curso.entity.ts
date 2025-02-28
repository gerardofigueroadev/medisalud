
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Modulo } from './modulo.entity';
import { Idioma } from './idioma.entity';
import { Nivel } from './nivel.entity';

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id_curso: number;

    @Column()
    codigo: string;

    @Column()
    nombre: string;

    @ManyToOne(() => Idioma, (idioma) => idioma.cursos, { eager: true })
    @JoinColumn({ name: 'id_idioma' })
    idioma: Idioma;

    @ManyToOne(() => Nivel, { eager: true })
    @JoinColumn({ name: 'id_nivel' })
    nivel: Nivel;

    @OneToMany(() => Modulo, (modulo) => modulo.curso)
    modulos: Modulo[];
}