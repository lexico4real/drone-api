import { Drone } from 'src/drones/entities/drone.entity';
import { Medication } from 'src/medications/entities/medication.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity()
export class DispatchHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(() => Drone, (drone) => drone.dispatchHistories)
  drone: Drone;

  @ManyToMany(() => Medication, (medication) => medication.dispatches, {
    eager: true,
  })
  @JoinTable()
  medications: Medication[];

  @Column({ default: false })
  isCompleted: boolean;
}
