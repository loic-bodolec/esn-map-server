import { AppDataSource } from '../../config/typeorm/data-source';
import { User } from '../entities/User';

export const userRepository = () => AppDataSource.getRepository(User);
