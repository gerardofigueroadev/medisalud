import { Insured } from 'src/insureds/insureds.model';
export declare class Plans {
    id: number;
    code: string;
    name: string;
    base_cost: number;
    dependent_cost: number;
    max_dependents: number;
    insureds: Insured[];
}
