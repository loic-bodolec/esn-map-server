import { AppDataSource } from '../../config/typeorm/data-source';
import { Job } from '../entities/Job';

export const jobRepository = () => AppDataSource.getRepository(Job);
