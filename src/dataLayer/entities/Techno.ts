import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consultant } from './Consultant';

@Entity()
export class Techno extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
    technoName: string;

  @ManyToMany(() => Consultant, (consultant: Consultant) => consultant.technos)
    consultants: Consultant[];
}
