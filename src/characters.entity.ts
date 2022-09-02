import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Characters {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
