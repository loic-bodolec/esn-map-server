import HttpException from '../../core/exceptions/HttpException';
import NotFoundException from '../../core/exceptions/NotFoundException';
import { Work } from '../entities/Work';
import { workRepository } from '../repositories/workRepository';

export const createWork = async (workData: Partial<Work>) => {
  // Vérifier si l'emploi' existe déjà
  const existingWork = await workRepository().findOne({ where: {
    workName: workData.workName,
  } });
  if (existingWork) {
    throw new HttpException('Un emploi avec ce nom existe déjà.', 409);
  }

  const work = workRepository().create(workData);
  return workRepository().save(work);
};

export const getWorks = async () => workRepository().find();

export const getWorkDetails = async (workId: string) => {
  const work = await workRepository().findOne({
    where: { id: parseInt(workId, 10) },
  });

  if (!work) {
    throw new NotFoundException('Work');
  }

  return work;
};

export const updateWork = async (workId: string, workData: Partial<Work>) => {
  const work = await workRepository().findOne({
    where: { id: parseInt(workId, 10) },
  });

  if (!work) {
    throw new NotFoundException('Work');
  }

  Object.assign(work, workData);

  return workRepository().save(work);
};

export const deleteWork = async (workId: string) => {
  const work = await workRepository().findOne({ where: { id: parseInt(workId, 10) } });

  if (!work) {
    throw new NotFoundException('Work');
  }

  return workRepository().delete({ id: parseInt(workId, 10) });
};
