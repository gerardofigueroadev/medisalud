import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Medidor } from './medidor.entity';
import { Precio } from './precio.entity';

@Entity('tipo_medidor')
export class TipoMedidor {
  @PrimaryGeneratedColumn()
  id_tipo_medidor: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 255 })
  descripcion: string;

  @OneToMany(() => Medidor, (medidor) => medidor.tipoMedidor)
  medidores: Medidor[];

  @OneToMany(() => Precio, (precio) => precio.tipoMedidor)
  precios: Precio[];
}
