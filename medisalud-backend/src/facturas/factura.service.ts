import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './factura.entity';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepo: Repository<Factura>,
  ) {}

  findAll(): Promise<Factura[]> {
    return this.facturaRepo.find({ relations: ['pedido'] }); // Opcional si usas relación con pedido
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepo.findOne({ where: { id }, relations: ['pedido'] });

    if (!factura) {
      throw new NotFoundException(`Factura con ID ${id} no encontrada`);
    }

    return factura;
  }
}
