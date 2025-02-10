import HttpException from '../../core/exceptions/HttpException';
import NotFoundException from '../../core/exceptions/NotFoundException';
import { Techno } from '../entities/Techno';
import { technoRepository } from '../repositories/technoRepository';

export const createTechno = async (technoData: Partial<Techno>) => {
  // Vérifier si la techno existe déjà
  const existingTechno = await technoRepository().findOne({ where: {
    technoName: technoData.technoName,
  } });
  if (existingTechno) {
    throw new HttpException('Une techno avec ce nom existe déjà.', 409);
  }
  const techno = technoRepository().create(technoData);
  return technoRepository().save(techno);
};

export const getTechnos = async () => technoRepository().find();

export const getTechnoDetails = async (technoId: string) => {
  const techno = await technoRepository().findOne({
    where: { id: parseInt(technoId, 10) },
  });

  if (!techno) {
    throw new NotFoundException('Techno');
  }

  return techno;
};

export const updateTechno = async (technoId: string, technoData: Partial<Techno>) => {
  const techno = await technoRepository().findOne({
    where: { id: parseInt(technoId, 10) },
  });

  if (!techno) {
    throw new NotFoundException('Techno');
  }

  Object.assign(techno, technoData);

  return technoRepository().save(techno);
};

export const deleteTechno = async (technoId: string) => {
  const techno = await technoRepository().findOne({ where: { id: parseInt(technoId, 10) } });

  if (!techno) {
    throw new NotFoundException('Techno');
  }

  return technoRepository().delete({ id: parseInt(technoId, 10) });
};
