import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Importacion } from './importacion.entity';
import { ImportacionDto } from './importacion.dto';
import { DetalleImportacion } from './detalle-importacion.entity';
import { TipoMedidor } from 'src/medidores/tipo-medidor.entity';
import { CreateImportacionDto } from './create-importacion.dto';

@Injectable()
export class ImportacionService {
  constructor(
    @InjectRepository(Importacion)
    private readonly importacionRepository: Repository<Importacion>,
    
    @InjectRepository(DetalleImportacion)
    private readonly detalleImportacionRepository: Repository<DetalleImportacion>,
    
    @InjectRepository(TipoMedidor)
    private readonly tipoMedidorRepository: Repository<TipoMedidor>,
  ) {}

  async getImportaciones(): Promise<ImportacionDto[]> {
    const importaciones = await this.importacionRepository.find({
      relations: ['detalles', 'detalles.tipoMedidor'],
    });

    return importaciones.map((importacion) => ({
      id_importacion: importacion.id_importacion,
      nro_importacion: importacion.nro_importacion,
      fecha_importacion: importacion.fecha_importacion,
      proveedor: importacion.proveedor,
      costo_total: importacion.costo_total,
      estado: importacion.estado,
      detalles: importacion.detalles.map((detalle) => ({
        id_detalle_importacion: detalle.id_detalle_importacion,
        tipo_medidor: {
          id_tipo_medidor: detalle.tipoMedidor.id_tipo_medidor,
          nombre: detalle.tipoMedidor.nombre,
          descripcion: detalle.tipoMedidor.descripcion,
        },
        cantidad: detalle.cantidad,
        precio_unitario: detalle.precio_unitario,
        subtotal: detalle.subtotal,
      })),
    }));
  }

  async createImportacion(dto: CreateImportacionDto): Promise<Importacion> {
    const importacion = this.importacionRepository.create({
      nro_importacion: dto.nro_importacion,
      fecha_importacion: dto.fecha_importacion,
      proveedor: dto.proveedor,
      costo_total: dto.costo_total,
      estado: dto.estado,
    });

    await this.importacionRepository.save(importacion);

    const detalles = await Promise.all(
      dto.detalles.map(async (detalle) => {
        const tipoMedidor = await this.tipoMedidorRepository.findOne({
          where: { id_tipo_medidor: detalle.id_tipo_medidor },
        });

        if (!tipoMedidor) {
          throw new Error(`Tipo de medidor con ID ${detalle.id_tipo_medidor} no encontrado`);
        }

        return this.detalleImportacionRepository.create({
          importacion,
          tipoMedidor,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          subtotal: detalle.subtotal,
        });
      }),
    );

    await this.detalleImportacionRepository.save(detalles);

    importacion.detalles = detalles;
    return importacion;
  }
}
