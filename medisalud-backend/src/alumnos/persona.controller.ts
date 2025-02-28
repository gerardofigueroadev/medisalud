import { Controller, Post, Body, Get } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaAlumnoDto } from './create.dto';

@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post('crear-alumno')
  async createPersonaAndAlumno(@Body() dto: CreatePersonaAlumnoDto) {
    return this.personaService.createPersonaAndAlumno(dto);
  }

  @Get('alumnos')
  async getAlumnos() {
    return this.personaService.getAlumnos();
  }
}