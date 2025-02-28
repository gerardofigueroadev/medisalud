// persona.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './persona.entity';
import { Alumno } from './alumno.entity';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Persona, Alumno])],
  providers: [PersonaService],
  controllers: [PersonaController]
})
export class PersonaModule {}