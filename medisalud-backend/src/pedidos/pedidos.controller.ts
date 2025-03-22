import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedidos.entity';
import { CreatePedidoDto } from './crear-pedido.dto';

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

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    console.log(createPedidoDto);
    return this.pedidosService.create(createPedidoDto); // Crea el nuevo pedido usando el servicio
  }
}
