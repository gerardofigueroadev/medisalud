import { Plans } from './plans.model';
import { Repository } from 'typeorm';
export declare class PlansService {
    private plansRepository;
    constructor(plansRepository: Repository<Plans>);
    findAll(): Promise<Plans[]>;
    findOne(id: number): Promise<Plans | null>;
    create(person: Partial<Plans>): Promise<Plans>;
    update(id: number, plan: Partial<Plans>): Promise<Plans | null>;
    delete(id: number): Promise<void>;
}
