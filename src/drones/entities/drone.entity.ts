import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Model, State } from '../enums';

@Entity()
export class Drone {
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
