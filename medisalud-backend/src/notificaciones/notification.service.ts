import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './notification.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private notificacionesRepo: Repository<Notificacion>,
  ) {}

  async findAll(): Promise<Notificacion[]> {
    return this.notificacionesRepo.find({
      relations: ['destinatario', 'pedido'], // Si quieres incluir detalles
      order: { fecha_hora: 'DESC' },
    });
  }
}
