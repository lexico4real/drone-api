import { BaseEntity } from '../../base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Model, State } from '../enums';

@Entity()
export class Drone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  serialNumber: string;

  @Column()
  model: Model;

  @Column()
  state: State;

  @Column()
  batteryCapacity: number;

  @Column()
  weightLimit: number;
}
