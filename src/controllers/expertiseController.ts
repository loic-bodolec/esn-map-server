/* eslint-disable max-len */
import { Request, Response } from 'express';
import { createExpertise, deleteExpertise, getExpertiseDetails, getExpertises, updateExpertise } from '../dataLayer/dao/expertiseDao';
import { Expertise } from '../dataLayer/entities/Expertise';
import { handleError } from '../utils/handleError';

export const createExpertiseController = async (req: Request, res: Response) => {
  try {
    const expertiseData = req.body as Partial<Expertise>;
    const expertise = await createExpertise(expertiseData);
    return res.status(201).json(expertise);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la création de l\'expertise :', error: handleError(error) });
  }
};

export const getExpertisesController = async (_req: Request, res: Response) => {
  try {
    const expertises = await getExpertises();
    return res.status(200).json(expertises);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des expertises :', error: handleError(error) });
  }
};

export const getExpertiseDetailsController = async (req: Request<{ expertiseId: string }>, res: Response) => {
  try {
    const { expertiseId } = req.params;

    const expertise = await getExpertiseDetails(expertiseId);
    if (!expertise) {
      return res.status(404).json({ message: 'Expertise non trouvée' });
    }

    return res.status(200).json(expertise);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des détails de l\'expertise :', error: handleError(error) });
  }
};

export const updateExpertiseController = async (req: Request<{ expertiseId: string }>, res: Response) => {
  try {
    const { expertiseId } = req.params;
    const expertiseData = req.body as Partial<Expertise>;

    const expertise = await updateExpertise(expertiseId, expertiseData);
    return res.status(200).json(expertise);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'expertise :', error: handleError(error) });
  }
};

export const deleteExpertiseController = async (req: Request<{ expertiseId: string }>, res: Response) => {
  try {
    const { expertiseId } = req.params;
    await deleteExpertise(expertiseId);
    return res.status(204).json({ message: 'Expertise supprimée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression de l\'expertise :', error: handleError(error) });
  }
};
