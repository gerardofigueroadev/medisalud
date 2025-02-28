import { IsInt } from 'class-validator';

export class CreateInscripcionDto {
    @IsInt()
    id_alumno: number;

    @IsInt()
    id_modulo: number;
}
