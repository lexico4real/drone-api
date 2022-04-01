import { Medication } from './../../medications/entities/medication.entity';
import { BaseEntity } from 'src/base.entity';
import { Drone } from 'src/drones/entities/drone.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dispatch extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @OneToOne(() => Drone)
  @JoinColumn()
  drone_id: Drone;

  @ManyToOne(() => Medication, (medication) => medication.dispatch, {
    eager: false,
  })
  medication: Medication;

  @Column({ default: false })
  is_completed: boolean;
}
