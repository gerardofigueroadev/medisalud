import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Producto } from './productos/producto.entity';
import { ProductosController } from './productos/producto.controller';
import { ProductosService } from './productos/producto.service';
import { Factura } from './facturas/factura.entity';
import { FacturasController } from './facturas/factura.controller';
import { FacturasService } from './facturas/factura.service';
import { Pedido } from './pedidos/pedidos.entity';
import { PedidosController } from './pedidos/pedidos.controller';
import { PedidosService } from './pedidos/pedidos.service';
import { Usuario } from './login/usuario.entity';
import { AuthService } from './login/auth.service';
import { AuthController } from './login/auth.controller';
import { NotificacionesController } from './notificaciones/notification.controller';
import { NotificacionesService } from './notificaciones/notification.service';
import { Notificacion } from './notificaciones/notification.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'pedidos',
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Producto, Factura, Pedido, Usuario, Notificacion])
  ],
  controllers: [AppController, ProductosController, FacturasController, PedidosController, AuthController, NotificacionesController],
  providers: [AppService, ProductosService, FacturasService, PedidosService, AuthService, NotificacionesService],
})
export class AppModule {}
