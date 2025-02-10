/* eslint-disable max-len */
import { In } from 'typeorm';
import HttpException from '../../core/exceptions/HttpException';
import NotFoundException from '../../core/exceptions/NotFoundException';
import { Client } from '../entities/Client';
import { clientRepository } from '../repositories/clientRepository';
import { expertiseRepository } from '../repositories/expertiseRepository';
import { jobRepository } from '../repositories/jobRepository';

export const createClient = async (clientData: Partial<Client>, jobIds: string[], expertiseIds: string[]) => {
  // Vérifier si le client existe déjà
  const existingClient = await clientRepository().findOne({ where: {
    name: clientData.name,
  } });
  if (existingClient) {
    throw new HttpException('Un client avec ce nom existe déjà.', 409);
  }

  const jobs = await jobRepository().findBy({ id: In(jobIds.map((id) => parseInt(id, 10))) });
  const expertises = await expertiseRepository().findBy({ id: In(expertiseIds.map((id) => parseInt(id, 10))) });

  if (jobs.length !== jobIds.length) {
    throw new Error('Un ou plusieurs métiers non trouvé(s)');
  }

  if (expertises.length !== expertiseIds.length) {
    throw new Error('Une ou plusieurs expertises non trouvée(s)');
  }

  const client = clientRepository().create(clientData);
  client.jobs = jobs;
  client.expertises = expertises;

  return clientRepository().save(client);
};

// Get clients with optional filtering by jobs and/or expertises
export const getClients = async (jobIds?: string[], expertiseIds?: string[]) => {
  const query = clientRepository().createQueryBuilder('client')
    .leftJoinAndSelect('client.jobs', 'job')
    .leftJoinAndSelect('client.expertises', 'expertise');

  if (jobIds && jobIds.length > 0) {
    query.andWhere('job.id IN (:...jobIds)', { jobIds: jobIds.map(id => parseInt(id, 10)) });
  }

  if (expertiseIds && expertiseIds.length > 0) {
    query.andWhere('expertise.id IN (:...expertiseIds)', { expertiseIds: expertiseIds.map(id => parseInt(id, 10)) });
  }

  return query.getMany();
};

export const getClientDetails = async (clientId: string) => clientRepository().findOne({
  where: { id: parseInt(clientId, 10) },
  relations: ['jobs', 'expertises', 'consultants', 'consultants.work'],
});

export const updateClient = async (clientId: string, clientData: Partial<Client>, jobIds?: string[], expertiseIds?: string[]) => {
  const client = await clientRepository().findOne({
    where: { id: parseInt(clientId, 10) },
    relations: ['jobs', 'expertises'],
  });

  if (!client) {
    throw new NotFoundException('Client');
  }

  if (jobIds) {
    const jobs = await jobRepository().findBy({ id: In(jobIds.map((id) => parseInt(id, 10))) });
    if (jobs.length !== jobIds.length) {
      throw new Error('Un ou plusieurs métiers non trouvé(s)');
    }
    client.jobs = jobs;
  }

  if (expertiseIds) {
    const expertises = await expertiseRepository().findBy({ id: In(expertiseIds.map((id) => parseInt(id, 10))) });
    if (expertises.length !== expertiseIds.length) {
      throw new Error('Une ou plusieurs expertises non trouvée(s)');
    }
    client.expertises = expertises;
  }

  Object.assign(client, clientData);

  return clientRepository().save(client);
};
export const deleteClient = async (clientId: string) => {
  const client = await clientRepository().findOne({ where: { id: parseInt(clientId, 10) } });

  if (!client) {
    throw new NotFoundException('Client');
  }

  return clientRepository().delete({ id: parseInt(clientId, 10) });
};
