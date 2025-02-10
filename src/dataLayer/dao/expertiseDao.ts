/* eslint-disable max-len */
import HttpException from '../../core/exceptions/HttpException';
import NotFoundException from '../../core/exceptions/NotFoundException';
import { Expertise } from '../entities/Expertise';
import { expertiseRepository } from '../repositories/expertiseRepository';

export const createExpertise = async (expertiseData: Partial<Expertise>) => {
  // Vérifier si l'expertise existe déjà
  const existingExpertise = await expertiseRepository().findOne({ where: {
    expertiseName: expertiseData.expertiseName,
  } });
  if (existingExpertise) {
    throw new HttpException('Une expertise avec ce nom existe déjà.', 409);
  }
  const expertise = expertiseRepository().create(expertiseData);
  return expertiseRepository().save(expertise);
};

export const getExpertises = async () => expertiseRepository().find();

export const getExpertiseDetails = async (expertiseId: string) => {
  const expertise = await expertiseRepository().findOne({
    where: { id: parseInt(expertiseId, 10) },
  });
  if (!expertise) {
    throw new NotFoundException('Expertise');
  }
  return expertise;
};

export const updateExpertise = async (expertiseId: string, expertiseData: Partial<Expertise>) => {
  const expertise = await expertiseRepository().findOne({
    where: { id: parseInt(expertiseId, 10) },
  });
  if (!expertise) {
    throw new NotFoundException('Expertise');
  }

  Object.assign(expertise, expertiseData);

  return expertiseRepository().save(expertise);
};

export const deleteExpertise = async (expertiseId: string) => {
  const expertise = await expertiseRepository().findOne({ where: { id: parseInt(expertiseId, 10) } });

  if (!expertise) {
    throw new NotFoundException('Expertise');
  }

  return expertiseRepository().delete({ id: parseInt(expertiseId, 10) });
};
