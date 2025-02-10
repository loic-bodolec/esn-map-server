/* eslint-disable max-len */
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';
import { Techno } from './Techno';
import { Work } from './Work';

@Entity()
export class Consultant extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
    firstname: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    lastname: string;

  @ManyToMany(() => Techno, (techno) => techno.consultants, { cascade: true })
  @JoinTable()
    technos: Techno[];

  @ManyToOne(() => Client, (client) => client.consultants, { cascade: true, nullable: true })
  @JoinColumn({ name: 'clientId' })
    client: Client;

  @ManyToOne(() => Work, (work: Work) => work.consultants, { cascade: true, nullable: false })
  @JoinColumn({ name: 'workId' })
    work: Work;
}
