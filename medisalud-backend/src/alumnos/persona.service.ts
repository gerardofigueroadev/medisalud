import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './persona.entity';
import { Alumno } from './alumno.entity';
import { CreatePersonaAlumnoDto } from './create.dto';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
  ) {}

  async createPersonaAndAlumno(dto: CreatePersonaAlumnoDto) {
    const { codigo_alumno, observaciones, ...personaData } = dto;
    const persona = this.personaRepository.create(personaData);
    await this.personaRepository.save(persona);

    const alumno = this.alumnoRepository.create({ codigo_alumno, observaciones, persona });
    return this.alumnoRepository.save(alumno);
  }

  async getAlumnos(): Promise<CreatePersonaAlumnoDto[]> {
    const alumnos = await this.alumnoRepository.find({ relations: ['persona'] });
    return alumnos.map(alumno => ({
      id_persona: alumno.persona.id_persona,
      nombre: alumno.persona.nombre,
      apellido: alumno.persona.apellido,
      tipo_documento: alumno.persona.tipo_documento,
      nro_documento: alumno.persona.nro_documento,
      telefono: alumno.persona.telefono,
      email: alumno.persona.email,
      direccion: alumno.persona.direccion,
      fecha_registro: new Date(),
      activo: true,
      id_alumno: alumno.id_alumno,
      codigo_alumno: alumno.codigo_alumno,
      observaciones: alumno.observaciones,
    }));
  }
}