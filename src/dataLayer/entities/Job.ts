import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
    jobName: string;

  @ManyToMany(() => Client, (client: Client) => client.jobs)
    clients: Client[];
}
