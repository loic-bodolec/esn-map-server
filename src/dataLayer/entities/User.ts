import bcrypt from 'bcryptjs';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
    username: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    firstname: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    lastname: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    job: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
    password: string;

  @Column({ default: 'user' })
  @IsIn(['user', 'admin'])
    role: string;

  // Méthode pour comparer les mots de passe
  async comparePassword(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this.password);
  }
}
