import { Injectable } from '@nestjs/common';
import { Plans } from './plans.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
    constructor(
        @InjectRepository(Plans)
        private plansRepository: Repository<Plans>,
    ) { }

    async findAll(): Promise<Plans[]> {
        return this.plansRepository.find();
    }

    async findOne(id: number): Promise<Plans | null> {
        return this.plansRepository.findOne({ where: { id } });
    }

    async create(person: Partial<Plans>): Promise<Plans> {
        const newPerson = this.plansRepository.create(person);
        return this.plansRepository.save(newPerson);
    }

    async update(id: number, plan: Partial<Plans>): Promise<Plans | null> {
        await this.plansRepository.update(id, plan);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.plansRepository.delete(id);
    }
}