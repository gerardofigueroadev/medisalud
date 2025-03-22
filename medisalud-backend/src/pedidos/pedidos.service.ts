import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedidos.entity';
import { CreatePedidoDto } from './crear-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidosRepo: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidosRepo.create(createPedidoDto); // Crea la entidad con los datos recibidos
    return this.pedidosRepo.save(pedido); // Guarda el pedido en la base de datos
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidosRepo.find({ relations: ['usuario'] }); // Incluye datos del mesero
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepo.findOne({ where: { id }, relations: ['usuario'] });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
  }
}
