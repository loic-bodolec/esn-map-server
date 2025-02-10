import { AppDataSource } from '../../config/typeorm/data-source';
import { Techno } from '../entities/Techno';

export const technoRepository = () => AppDataSource.getRepository(Techno);
