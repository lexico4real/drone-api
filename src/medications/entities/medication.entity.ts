import { BaseEntity } from 'src/base.entity';
import { Dispatch } from 'src/dispatch/entities/dispatch.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Dispatch, (dispatch) => dispatch.medication, { eager: true })
  dispatch: Dispatch[];
}
