import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from './persons.model';
import { Plans } from 'src/plans/plans.model';

@Entity('insureds')
export class Insured {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, person => person.insureds, { onDelete: 'CASCADE' })
  person: Person;

  @ManyToOne(() => Plans, plans => plans.insureds, { onDelete: 'SET NULL' })
  plan: Plans;

  @Column({ unique: true })
  email: string;

  @Column()
  status: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;
}
