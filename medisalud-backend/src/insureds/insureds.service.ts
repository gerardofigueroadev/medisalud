import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInsuredDto } from './create_insured.dto';
import { Person } from './persons.model';
import { Plans } from 'src/plans/plans.model';
import { Insured } from './insureds.model';

@Injectable()
export class InsuredsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    
    @InjectRepository(Plans)
    private readonly planRepository: Repository<Plans>,
    
    @InjectRepository(Insured)
    private readonly insuredRepository: Repository<Insured>,
  ) {}

  async createInsured(dto: CreateInsuredDto): Promise<Insured> {
    // Verificar si el número de identidad ya existe
    let person = await this.personRepository.findOne({
      where: { identity_number: dto.identity_number },
    });

    if (!person) {
      // Crear persona si no existe
      person = this.personRepository.create({
        identity_number: dto.identity_number,
        first_name: dto.first_name,
        last_name: dto.last_name,
        birth_date: dto.birth_date,
        phone: dto.phone,
        address: dto.address,
      });

      await this.personRepository.save(person);
    }

    // Verificar si el plan existe
    const plan = await this.planRepository.findOne({ where: { id: dto.plan_id } });
    if (!plan) {
      throw new NotFoundException('Plan no encontrado');
    }

    // Verificar si el email ya está registrado en insureds
    const existingInsured = await this.insuredRepository.findOne({ where: { email: dto.email } });
    if (existingInsured) {
      throw new ConflictException('El email ya está registrado en insureds');
    }

    // Crear insured
    const insured = this.insuredRepository.create({
      person,
      plan,
      email: dto.email,
      status: dto.status,
      start_date: dto.start_date,
      end_date: dto.end_date,
    });

    return await this.insuredRepository.save(insured);
  }

  async findAll(): Promise<Insured[]> {
    return await this.insuredRepository.find({
      relations: ['person', 'plan'], // Incluye relaciones
    });
  }  
}
