import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Expertise extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
    expertiseName: string;

  @ManyToMany(() => Client, (client: Client) => client.expertises)
    clients: Client[];
}
