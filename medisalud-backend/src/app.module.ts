import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CompraController } from './compras/compra.controller';
import { CompraService } from './compras/compra.service';
import { Compra } from './compras/compra.entity';
import { Cliente } from './compras/cliente.entity';
import { Medidor } from './medidores/medidor.entity';
import { TipoMedidor } from './medidores/tipo-medidor.entity';
import { Precio } from './medidores/precio.entity';
import { MedidorService } from './medidores/medidor.service';
import { MedidorController } from './medidores/medidor.controller';
import { Importacion } from './importaciones/importacion.entity';
import { DetalleImportacion } from './importaciones/detalle-importacion.entity';
import { ImportacionController } from './importaciones/importacion.controller';
import { ImportacionService } from './importaciones/importacion.service';
import { Factura } from './facturas/factura.entity';
import { FacturaController } from './facturas/factura.controller';
import { FacturaService } from './facturas/factura.service';
import { DetalleCompra } from './compras/detalle-compra.entity';
import { ClienteService } from './clientes/cliente.service';
import { ClienteController } from './clientes/cliente.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'inventario',
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Compra, Cliente, Medidor, TipoMedidor, Precio, Importacion, DetalleImportacion, Factura, DetalleCompra])
  ],
  controllers: [AppController, CompraController, MedidorController, ImportacionController, FacturaController, ClienteController],
  providers: [AppService, CompraService, MedidorService, ImportacionService, FacturaService, ClienteService],
})
export class AppModule {}
