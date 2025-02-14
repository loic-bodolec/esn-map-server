/* eslint-disable max-len */
import { Request, Response } from 'express';
import logger from '../config/logger/logger';
import { createWork, deleteWork, getWorkDetails, getWorks, updateWork } from '../dataLayer/dao/workDao';
import { Work } from '../dataLayer/entities/Work';
import { handleError } from '../utils/handleError';

export const createWorkController = async (req: Request, res: Response) => {
  try {
    const workData = req.body as Partial<Work>;
    const work = await createWork(workData);
    logger.info(`Work created successfully: ${work.id}`);
    return res.status(201).json(work);
  } catch (error) {
    logger.error(`Error creating work: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la création du travail :', error: handleError(error) });
  }
};

export const getWorksController = async (_req: Request, res: Response) => {
  try {
    const works = await getWorks();
    logger.info(`Fetched ${works.length} works`);
    return res.status(200).json(works);
  } catch (error) {
    logger.error(`Error fetching works: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des travaux :', error: handleError(error) });
  }
};

export const getWorkDetailsController = async (req: Request<{ workId: string }>, res: Response) => {
  const { workId } = req.params;
  try {
    const work = await getWorkDetails(workId);
    if (!work) {
      logger.warn(`Work not found: ${workId}`);
      return res.status(404).json({ message: 'Travail non trouvé' });
    }

    logger.info(`Fetched details for work: ${workId}`);
    return res.status(200).json(work);
  } catch (error) {
    logger.error(`Error fetching work details for ${workId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des détails du travail :', error: handleError(error) });
  }
};

export const updateWorkController = async (req: Request<{ workId: string }>, res: Response) => {
  const { workId } = req.params;
  try {
    const workData = req.body as Partial<Work>;

    const work = await updateWork(workId, workData);
    logger.info(`Work updated successfully: ${workId}`);
    return res.status(200).json(work);
  } catch (error) {
    logger.error(`Error updating work ${workId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du travail :', error: handleError(error) });
  }
};

export const deleteWorkController = async (req: Request<{ workId: string }>, res: Response) => {
  const { workId } = req.params;
  try {
    await deleteWork(workId);
    logger.info(`Work deleted successfully: ${workId}`);
    return res.status(204).json({ message: 'Travail supprimé avec succès' });
  } catch (error) {
    logger.error(`Error deleting work ${workId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la suppression du travail :', error: handleError(error) });
  }
};