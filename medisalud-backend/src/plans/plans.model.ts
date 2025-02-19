import { Insured } from 'src/insureds/insureds.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('plans')
export class Plans {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  base_cost: number;

  @Column()
  dependent_cost: number;

  @Column()
  max_dependents: number;

  @OneToMany(() => Insured, insured => insured.plan)
  insureds: Insured[];
}
