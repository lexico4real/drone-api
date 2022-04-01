import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medication {
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
}
