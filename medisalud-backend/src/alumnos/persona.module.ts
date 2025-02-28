// persona.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './persona.entity';
import { Alumno } from './alumno.entity';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller'
import { ModuloService } from 'src/modulos/modulo.service';
import { ModuloController } from 'src/modulos/modulos.controller';
import { Modulo } from 'src/modulos/modulo.entity';
import { Curso } from 'src/modulos/curso.entity';
import { Periodo } from 'src/modulos/periodos.entity';
import { Profesor } from 'src/modulos/profesor.entity';
import { Aula } from 'src/modulos/aula.entity';
import { Horario } from 'src/modulos/horario.entity';
import { Idioma } from 'src/modulos/idioma.entity';
import { Nivel } from 'src/modulos/nivel.entity';
import { InscripcionService } from 'src/inscripciones/inscripcion.service';
import { InscripcionController } from 'src/inscripciones/inscripciones.controller';
import { Inscripcion } from 'src/inscripciones/inscripcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persona, Alumno, Modulo, Curso, Periodo, Profesor, Aula, Horario, Idioma, Nivel, Inscripcion])],
  providers: [PersonaService, ModuloService, InscripcionService],
  controllers: [PersonaController, ModuloController, InscripcionController]
})
export class PersonaModule {}