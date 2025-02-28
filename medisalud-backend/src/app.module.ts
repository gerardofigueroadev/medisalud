import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PlansModule } from './plans/plans.module';
import { InsuredsModule } from './insureds/insureds.module';
import { PersonaModule } from './alumnos/persona.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'idiomas',
      autoLoadEntities: true,
      synchronize: false,
    }),
    PlansModule,
    InsuredsModule,
    PersonaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
