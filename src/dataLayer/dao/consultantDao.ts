/* eslint-disable max-len */
import { In } from 'typeorm';
import HttpException from '../../core/exceptions/HttpException';
import NotFoundException from '../../core/exceptions/NotFoundException';
import { Consultant } from '../entities/Consultant';
import { clientRepository } from '../repositories/clientRepository';
import { consultantRepository } from '../repositories/consultantRepository';
import { technoRepository } from '../repositories/technoRepository';
import { workRepository } from '../repositories/workRepository';

export const createConsultant = async (consultantData: Partial<Consultant>, technoIds: string[], workId: string, clientId?: string) => {
  // Vérifier si le consultant existe déjà
  const existingConsultant = await consultantRepository().findOne({ where: {
    lastname: consultantData.lastname,
    firstname: consultantData.firstname,
  } });
  if (existingConsultant) {
    throw new HttpException('Un consultant avec ce nom et ce prénom existe déjà.', 409);
  }

  const technos = await technoRepository().findBy({ id: In(technoIds.map((id) => parseInt(id, 10))) });
  const work = await workRepository().findOne({
    where: { id: parseInt(workId, 10) } });

  if (technos.length !== technoIds.length) {
    throw new Error('Une ou plusieurs technologies non trouvée(s)');
  }

  if (!work) {
    throw new Error('Travail non trouvé');
  }

  const consultant = consultantRepository().create(consultantData);
  consultant.technos = technos;
  consultant.work = work;

  if (clientId) {
    const client = await clientRepository().findOne({
      where: { id: parseInt(clientId, 10) } });

    if (!client) {
      throw new Error('Client non trouvé');
    }

    consultant.client = client;
  }

  return consultantRepository().save(consultant);
};

export const getConsultants = async (technoIds?: string[], workIds?: string[], clientIds?: string[]) => {
  const query = consultantRepository().createQueryBuilder('consultant')
    .leftJoinAndSelect('consultant.technos', 'techno')
    .leftJoinAndSelect('consultant.work', 'work')
    .leftJoinAndSelect('consultant.client', 'client');

  if (technoIds && technoIds.length > 0) {
    query.andWhere('techno.id IN (:...technoIds)', { technoIds: technoIds.map(id => parseInt(id, 10)) });
  }

  if (workIds && workIds.length > 0) {
    query.andWhere('work.id IN (:...workIds)', { workIds: workIds.map(id => parseInt(id, 10)) });
  }

  if (clientIds && clientIds.length > 0) {
    query.andWhere('client.id IN (:...clientIds)', { clientIds: clientIds.map(id => parseInt(id, 10)) });
  }

  return query.getMany();
};

export const getConsultantDetails = async (consultantId: string) => consultantRepository().findOne({
  where: { id: parseInt(consultantId, 10) },
  relations: ['technos', 'work', 'client'],
});

export const updateConsultant = async (consultantId: string, consultantData: Partial<Consultant>, technoIds?: string[], workId?: string, clientId?: string) => {
  const consultant = await consultantRepository().findOne({
    where: { id: parseInt(consultantId, 10) },
    relations: ['technos', 'work', 'client'],
  });

  if (!consultant) {
    throw new NotFoundException('Consultant');
  }

  if (technoIds) {
    const technos = await technoRepository().findBy({ id: In(technoIds.map((id) => parseInt(id, 10))) });
    if (technos.length !== technoIds.length) {
      throw new Error('Une ou plusieurs technologies non trouvée(s)');
    }
    consultant.technos = technos;
  }

  if (workId) {
    const work = await workRepository().findOne({
      where: { id: parseInt(workId, 10) } });
    if (!work) {
      throw new Error('Emploi non trouvé');
    }
    consultant.work = work;
  }
  if (clientId) {
    const client = await clientRepository().findOne({
      where: { id: parseInt(clientId, 10) } });
    if (!client) {
      throw new Error('Client non trouvé');
    }
    consultant.client = client;
  }

  Object.assign(consultant, consultantData);

  return consultantRepository().save(consultant);
};

export const deleteConsultant = async (consultantId: string) => {
  const consultant = await consultantRepository().findOne({ where: { id: parseInt(consultantId, 10) } });

  if (!consultant) {
    throw new NotFoundException('Consultant');
  }

  return consultantRepository().delete({ id: parseInt(consultantId, 10) });
};
