import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TipoMedidor } from './tipo-medidor.entity';
import { Precio } from './precio.entity';

@Entity('medidor')
export class Medidor {
  @PrimaryGeneratedColumn()
  id_medidor: number;

  @ManyToOne(() => TipoMedidor, (tipoMedidor) => tipoMedidor.medidores)
  @JoinColumn({ name: 'id_tipo_medidor' })
  tipoMedidor: TipoMedidor;

  @Column({ length: 50 })
  numero_serie: string;

  @Column({ length: 50 })
  marca: string;

  @Column({ length: 50 })
  modelo: string;

  @Column({ length: 20 })
  estado: string; // Nuevo, Usado, Calibrado, Vendido

  @Column({ type: 'boolean' })
  sistema_seguridad: boolean;

  @Column({ type: 'date' })
  fecha_fabricacion: string;

  @Column({ type: 'date', nullable: true })
  fecha_calibracion: string;

  @Column({ length: 255, nullable: true })
  valores_calibracion: string;

  @OneToMany(() => Precio, (precio) => precio.tipoMedidor)
  precios: Precio[];
}
