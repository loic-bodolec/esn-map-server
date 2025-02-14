/* eslint-disable max-len */
import { Request, Response } from 'express';
import logger from '../config/logger/logger';
import { createExpertise, deleteExpertise, getExpertiseDetails, getExpertises, updateExpertise } from '../dataLayer/dao/expertiseDao';
import { Expertise } from '../dataLayer/entities/Expertise';
import { handleError } from '../utils/handleError';

export const createExpertiseController = async (req: Request, res: Response) => {
  try {
    const expertiseData = req.body as Partial<Expertise>;
    const expertise = await createExpertise(expertiseData);
    logger.info(`Expertise created successfully: ${expertise.id}`);
    return res.status(201).json(expertise);
  } catch (error) {
    logger.error(`Error creating expertise: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la création de l\'expertise :', error: handleError(error) });
  }
};

export const getExpertisesController = async (_req: Request, res: Response) => {
  try {
    const expertises = await getExpertises();
    logger.info(`Fetched ${expertises.length} expertises`);
    return res.status(200).json(expertises);
  } catch (error) {
    logger.error(`Error fetching expertises: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des expertises :', error: handleError(error) });
  }
};

export const getExpertiseDetailsController = async (req: Request<{ expertiseId: string }>, res: Response) => {
  const { expertiseId } = req.params;
  try {
    const expertise = await getExpertiseDetails(expertiseId);
    if (!expertise) {
      logger.warn(`Expertise not found: ${expertiseId}`);
      return res.status(404).json({ message: 'Expertise non trouvée' });
    }

    logger.info(`Fetched details for expertise: ${expertiseId}`);
    return res.status(200).json(expertise);
  } catch (error) {
    logger.error(`Error fetching expertise details for ${expertiseId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des détails de l\'expertise :', error: handleError(error) });
  }
};

export const updateExpertiseController = async (req: Request<{ expertiseId: string }>, res: Response) => {
  const { expertiseId } = req.params;
  try {
    const expertiseData = req.body as Partial<Expertise>;

    const expertise = await updateExpertise(expertiseId, expertiseData);
    logger.info(`Expertise updated successfully: ${expertiseId}`);
    return res.status(200).json(expertise);
  } catch (error) {
    logger.error(`Error updating expertise ${expertiseId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'expertise :', error: handleError(error) });
  }
};

export const deleteExpertiseController = async (req: Request<{ expertiseId: string }>, res: Response) => {
  const { expertiseId } = req.params;
  try {
    await deleteExpertise(expertiseId);
    logger.info(`Expertise deleted successfully: ${expertiseId}`);
    return res.status(204).json({ message: 'Expertise supprimée avec succès' });
  } catch (error) {
    logger.error(`Error deleting expertise ${expertiseId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la suppression de l\'expertise :', error: handleError(error) });
  }
};