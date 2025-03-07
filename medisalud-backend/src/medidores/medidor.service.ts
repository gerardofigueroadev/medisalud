import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medidor } from './medidor.entity';
import { MedidorDto } from './medidor.dto';

@Injectable()
export class MedidorService {
  constructor(
    @InjectRepository(Medidor)
    private readonly medidorRepository: Repository<Medidor>,
  ) {}

  async getMedidores(): Promise<MedidorDto[]> {
    const medidores = await this.medidorRepository.find({
      relations: ['tipoMedidor', 'tipoMedidor.precios'],
    });

    return medidores.map((medidor) => ({
      id_medidor: medidor.id_medidor,
      numero_serie: medidor.numero_serie,
      marca: medidor.marca,
      modelo: medidor.modelo,
      estado: medidor.estado,
      sistema_seguridad: medidor.sistema_seguridad,
      fecha_fabricacion: medidor.fecha_fabricacion,
      fecha_calibracion: medidor.fecha_calibracion,
      valores_calibracion: medidor.valores_calibracion,
      tipo_medidor: {
        id_tipo_medidor: medidor.tipoMedidor.id_tipo_medidor,
        nombre: medidor.tipoMedidor.nombre,
        descripcion: medidor.tipoMedidor.descripcion,
      },
      precios: medidor.tipoMedidor.precios.map((precio) => ({
        id_precio: precio.id_precio,
        sistema_seguridad: precio.sistema_seguridad,
        valor_usd: precio.valor_usd,
        fecha_vigencia: precio.fecha_vigencia,
        estado: precio.estado,
      })),
    }));
  }
}
