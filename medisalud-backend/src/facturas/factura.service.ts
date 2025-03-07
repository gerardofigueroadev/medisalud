import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './factura.entity';
import { Compra } from 'src/compras/compra.entity';
import { CreateFacturaDto } from './factura.dto';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,

    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) {}

  async createFactura(dto: CreateFacturaDto): Promise<Factura> {
    const compra = await this.compraRepository.findOne({ where: { id_compra: dto.id_compra } });

    if (!compra) {
      throw new NotFoundException(`Compra con ID ${dto.id_compra} no encontrada.`);
    }

    const factura = this.facturaRepository.create({
      compra,
      nro_factura: dto.nro_factura,
      fecha_emision: dto.fecha_emision,
      monto_total: dto.monto_total,
      estado: dto.estado,
    });

    return await this.facturaRepository.save(factura);
  }
}
