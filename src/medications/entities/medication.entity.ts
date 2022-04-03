import { BaseEntity } from 'src/base.entity';
import { Dispatch } from 'src/dispatch/entities/dispatch.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Medication extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  code: string;

  @Column()
  image: string;

  @ManyToMany(() => Dispatch, (dispatch) => dispatch.medications, {
    eager: false,
  })
  dispatches: Dispatch[];
}
