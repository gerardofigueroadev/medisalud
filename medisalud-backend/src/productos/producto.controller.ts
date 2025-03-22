import { Controller, Get } from '@nestjs/common';
import { ProductosService } from './producto.service';
import { Producto } from './producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async getAll(): Promise<Producto[]> {
    return this.productosService.findAll();
  }
}
