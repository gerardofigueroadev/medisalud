import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedidos.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  async getAll(): Promise<Pedido[]> {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.pedidosService.findOne(id);
  }
}
