import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consultant } from './Consultant';

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
    workName: string;

  @OneToMany(() => Consultant, (consultant: Consultant) => consultant.work)
    consultants: Consultant[];
}
