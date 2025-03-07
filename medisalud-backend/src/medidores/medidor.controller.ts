import { Controller, Get } from '@nestjs/common';
import { MedidorService } from './medidor.service';
import { MedidorDto } from './medidor.dto';

@Controller('medidores')
export class MedidorController {
  constructor(private readonly medidorService: MedidorService) {}

  @Get()
  async getMedidores(): Promise<MedidorDto[]> {
    return this.medidorService.getMedidores();
  }
}
