import { Controller, Get } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from 'src/compras/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async getClientes(): Promise<Cliente[]> {
    return this.clienteService.getClientes();
  }
}
