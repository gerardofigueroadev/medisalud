import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { CreateInscripcionDto } from './inscripcion.dto';
import { Alumno } from '../alumnos/alumno.entity';
import { Modulo } from '../modulos/modulo.entity';

@Injectable()
export class InscripcionService {
    constructor(
        @InjectRepository(Inscripcion)
        private readonly inscripcionRepository: Repository<Inscripcion>,
        @InjectRepository(Alumno)
        private readonly alumnoRepository: Repository<Alumno>,
        @InjectRepository(Modulo)
        private readonly moduloRepository: Repository<Modulo>,
    ) {}

    async inscribirAlumno(dto: CreateInscripcionDto): Promise<Inscripcion> {
        const alumno = await this.alumnoRepository.findOne({ where: { id_alumno: dto.id_alumno } });
        if (!alumno) {
            throw new Error('Alumno no encontrado');
        }

        const modulo = await this.moduloRepository.findOne({ where: { id_modulo: dto.id_modulo } });
        if (!modulo) {
            throw new Error('Módulo no encontrado');
        }

        const inscripcion = this.inscripcionRepository.create({ alumno, modulo });
        return await this.inscripcionRepository.save(inscripcion);
    }

    async obtenerAlumnosPorModulo(id_modulo: number) {
        return await this.inscripcionRepository.find({
            where: { modulo: { id_modulo } },
            relations: ['alumno', 'alumno.persona'], // Agregar la relación con persona
        });
    }
}
