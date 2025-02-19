import { PlansService } from './plans.service';
import { Plans } from './plans.model';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    getAll(): Promise<Plans[]>;
    getOne(id: number): Promise<Plans | null>;
    create(plan: Partial<Plans>): Promise<Plans>;
    update(id: number, plan: Partial<Plans>): Promise<Plans | null>;
    remove(id: number): Promise<void>;
}
