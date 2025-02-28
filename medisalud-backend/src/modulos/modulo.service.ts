import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulo } from './modulo.entity';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private readonly moduloRepository: Repository<Modulo>,
  ) {}

  async getAllModulos() {
    return this.moduloRepository.find({
      relations: [
        'curso',
        'curso.idioma',
        'curso.nivel',
        'periodo',
        'profesor',
        'profesor.persona',
        'aula',
        'horarios',
      ],
    });
  }
}