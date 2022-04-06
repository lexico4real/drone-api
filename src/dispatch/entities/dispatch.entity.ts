import { Medication } from './../../medications/entities/medication.entity';
import { BaseEntity } from '../../base.entity';
import { Drone } from 'src/drones/entities/drone.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
  drone: Drone;

  @ManyToMany(() => Medication, (medication) => medication.dispatches, {
    eager: true,
  })
  @JoinTable()
  medications: Medication[];

  @Column({ default: false })
  isCompleted: boolean;
}
