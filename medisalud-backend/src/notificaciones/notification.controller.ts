import { Controller, Get } from '@nestjs/common';
import { NotificacionesService } from './notification.service';
import { Notificacion } from './notification.entity';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Get()
  async getAll(): Promise<Notificacion[]> {
    return this.notificacionesService.findAll();
  }
}
