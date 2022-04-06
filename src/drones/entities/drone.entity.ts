import { BaseEntity } from '../../base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Model, State } from '../enums';

@Entity()
export class Drone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  serial_number: string;

  @Column()
  model: Model;

  @Column()
  state: State;

  @Column()
  battery_capacity: number;

  @Column()
  weight_limit: number;
}
