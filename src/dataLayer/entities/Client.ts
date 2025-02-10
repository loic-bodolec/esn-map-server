import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consultant } from './Consultant';
import { Expertise } from './Expertise';
import { Job } from './Job';

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
    name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    activity: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    address: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    latitude: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    longitude: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
    logo: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
    link: string;

  @OneToMany(() => Consultant, (consultant: Consultant) => consultant.client)
    consultants: Consultant[];

  @ManyToMany(() => Expertise, (expertise) => expertise.clients, { cascade: true })
  @JoinTable()
    expertises: Expertise[];

  @ManyToMany(() => Job, (job) => job.clients, { cascade: true })
  @JoinTable()
    jobs: Job[];
}
