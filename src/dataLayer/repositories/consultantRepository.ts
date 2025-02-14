import { AppDataSource } from '../../config/typeorm/data-source';
import { Consultant } from '../entities/Consultant';

export const consultantRepository = () => AppDataSource.getRepository(Consultant);
