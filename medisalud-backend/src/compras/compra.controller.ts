import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraDto } from './compra.dto';
import { CreateCompraDto } from './create-compra.dto';
import { Compra } from './compra.entity';

@Controller('compras')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Get()
  async getCompras(): Promise<CompraDto[]> {
    return this.compraService.getCompras();
  }

  @Post()
  async createCompra(@Body() dto: CreateCompraDto): Promise<Compra> {
    return this.compraService.createCompra(dto);
  }
}
