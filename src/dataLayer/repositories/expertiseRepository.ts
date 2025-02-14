import { AppDataSource } from '../../config/typeorm/data-source';
import { Expertise } from '../entities/Expertise';

export const expertiseRepository = () => AppDataSource.getRepository(Expertise);
