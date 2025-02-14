import { AppDataSource } from '../../config/typeorm/data-source';
import { Work } from '../entities/Work';

export const workRepository = () => AppDataSource.getRepository(Work);
