import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { InscripcionService } from './inscripcion.service';
import { CreateInscripcionDto } from './inscripcion.dto';

@Controller('inscripciones')
export class InscripcionController {
    constructor(private readonly inscripcionService: InscripcionService) {}

    @Post()
    async inscribirAlumno(@Body() dto: CreateInscripcionDto) {
        return await this.inscripcionService.inscribirAlumno(dto);
    }

    @Get('modulo/:id_modulo')
    async obtenerAlumnosPorModulo(@Param('id_modulo') id_modulo: number) {
        return await this.inscripcionService.obtenerAlumnosPorModulo(id_modulo);
    }
}
