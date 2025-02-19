import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Insured } from './insureds.model';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identity_number: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Insured, insured => insured.person)
  insureds: Insured[];
}
