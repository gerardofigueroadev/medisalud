import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './/compra.entity';
import { CompraDto } from './compra.dto';
import { Cliente } from './cliente.entity';
import { DetalleCompra } from './detalle-compra.entity';
import { Medidor } from 'src/medidores/medidor.entity';
import { CreateCompraDto } from './create-compra.dto';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
    
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(DetalleCompra)
    private readonly detalleCompraRepository: Repository<DetalleCompra>,

    @InjectRepository(Medidor)
    private readonly medidorRepository: Repository<Medidor>,
  ) {}

  async getCompras(): Promise<CompraDto[]> {
    const compras = await this.compraRepository.find({ relations: ['cliente'] });

    return compras.map((compra) => ({
      id_compra: compra.id_compra,
      fecha_compra: compra.fecha_compra,
      total: compra.total,
      estado: compra.estado,
      cliente: {
        id_cliente: compra.cliente.id_cliente,
        nombre: compra.cliente.nombre,
        apellido: compra.cliente.apellido,
        direccion: compra.cliente.direccion,
        telefono: compra.cliente.telefono,
        email: compra.cliente.email,
        nit: compra.cliente.nit,
      },
    }));
  }

  async createCompra(dto: CreateCompraDto): Promise<Compra> {
    // Verificar si el cliente existe
    const cliente = await this.clienteRepository.findOne({ where: { id_cliente: dto.id_cliente } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${dto.id_cliente} no encontrado.`);
    }

    // Crear la compra
    const compra = this.compraRepository.create({
      cliente,
      fecha_compra: dto.fecha_compra,
      total: dto.total,
      estado: dto.estado,
    });

    await this.compraRepository.save(compra);

    // Crear los detalles de la compra
    const detalles = await Promise.all(
      dto.detalles.map(async (detalle) => {
        const medidor = await this.medidorRepository.findOne({ where: { id_medidor: detalle.id_medidor } });

        if (!medidor) {
          throw new NotFoundException(`Medidor con ID ${detalle.id_medidor} no encontrado.`);
        }

        return this.detalleCompraRepository.create({
          compra,
          medidor,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          subtotal: detalle.subtotal,
        });
      }),
    );

    await this.detalleCompraRepository.save(detalles);

    compra.detalles = detalles;
    return compra;
  }
}
