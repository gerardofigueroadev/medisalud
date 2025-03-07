import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TipoMedidor } from './tipo-medidor.entity';

@Entity('precio')
export class Precio {
  @PrimaryGeneratedColumn()
  id_precio: number;

  @ManyToOne(() => TipoMedidor, (tipoMedidor) => tipoMedidor.precios)
  @JoinColumn({ name: 'id_tipo_medidor' })
  tipoMedidor: TipoMedidor;

  @Column({ type: 'boolean' })
  sistema_seguridad: boolean;

  @Column({ type: 'decimal' })
  valor_usd: number;

  @Column({ type: 'date' })
  fecha_vigencia: string;

  @Column({ length: 20 })
  estado: string;
}
