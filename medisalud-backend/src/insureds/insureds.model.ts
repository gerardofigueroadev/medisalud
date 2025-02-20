import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from './persons.model';
import { Plans } from 'src/plans/plans.model';

@Entity('insureds')
export class Insured {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, person => person.insureds, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' }) // 🔹 Define explícitamente el nombre de la columna
  person: Person;

  @ManyToOne(() => Plans, plans => plans.insureds, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'plan_id' }) // 🔹 Define explícitamente el nombre de la columna
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
