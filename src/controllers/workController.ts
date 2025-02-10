/* eslint-disable max-len */
import { Request, Response } from 'express';
import { createWork, deleteWork, getWorkDetails, getWorks, updateWork } from '../dataLayer/dao/workDao';
import { Work } from '../dataLayer/entities/Work';
import { handleError } from '../utils/handleError';

export const createWorkController = async (req: Request, res: Response) => {
  try {
    const workData = req.body as Partial<Work>;
    const work = await createWork(workData);
    return res.status(201).json(work);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la création du travail :', error: handleError(error) });
  }
};

export const getWorksController = async (_req: Request, res: Response) => {
  try {
    const works = await getWorks();
    return res.status(200).json(works);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des travaux :', error: handleError(error) });
  }
};

export const getWorkDetailsController = async (req: Request<{ workId: string }>, res: Response) => {
  try {
    const { workId } = req.params;

    const work = await getWorkDetails(workId);
    if (!work) {
      return res.status(404).json({ message: 'Travail non trouvé' });
    }

    return res.status(200).json(work);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des détails du travail :', error: handleError(error) });
  }
};

export const updateWorkController = async (req: Request<{ workId: string }>, res: Response) => {
  try {
    const { workId } = req.params;
    const workData = req.body as Partial<Work>;

    const work = await updateWork(workId, workData);
    return res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du travail :', error: handleError(error) });
  }
};

export const deleteWorkController = async (req: Request<{ workId: string }>, res: Response) => {
  try {
    const { workId } = req.params;
    await deleteWork(workId);
    return res.status(204).json({ message: 'Travail supprimé avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression du travail :', error: handleError(error) });
  }
};
