import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuredsService } from './insureds.service';
import { InsuredsController } from './insureds.controller';
import { Insured } from './insureds.model';
import { Person } from './persons.model';
import { Plans } from 'src/plans/plans.model';

@Module({
  imports: [TypeOrmModule.forFeature([Insured, Person, Plans])],
  controllers: [InsuredsController],
  providers: [InsuredsService],
})
export class InsuredsModule {}
