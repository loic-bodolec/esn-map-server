import { AppDataSource } from '../../config/typeorm/data-source';
import { Client } from '../entities/Client';

export const clientRepository = () => AppDataSource.getRepository(Client);
