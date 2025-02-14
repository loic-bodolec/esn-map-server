/* eslint-disable max-len */
import { Request, Response } from 'express';
import logger from '../config/logger/logger';
import { createTechno, deleteTechno, getTechnoDetails, getTechnos, updateTechno } from '../dataLayer/dao/technoDao';
import { Techno } from '../dataLayer/entities/Techno';
import { handleError } from '../utils/handleError';

export const createTechnoController = async (req: Request, res: Response) => {
  try {
    const technoData = req.body as Partial<Techno>;

    if (!technoData.technoName || technoData.technoName.trim() === '') {
      return res.status(400).json({ message: 'Le champ "technoName" est requis et ne peut pas être vide.' });
    }

    const techno = await createTechno(technoData);
    logger.info(`Techno created successfully: ${techno.id}`);
    return res.status(201).json(techno);
  } catch (error) {
    logger.error(`Error creating techno: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la création de la techno :', error: handleError(error) });
  }
};

export const getTechnosController = async (_req: Request, res: Response) => {
  try {
    const technos = await getTechnos();
    logger.info(`Fetched ${technos.length} technos`);
    return res.status(200).json(technos);
  } catch (error) {
    logger.error(`Error fetching technos: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des technos :', error: handleError(error) });
  }
};

export const getTechnoDetailsController = async (req: Request<{ technoId: string }>, res: Response) => {
  const { technoId } = req.params;
  try {
    const techno = await getTechnoDetails(technoId);
    if (!techno) {
      logger.warn(`Techno not found: ${technoId}`);
      return res.status(404).json({ message: 'Techno non trouvée' });
    }

    logger.info(`Fetched details for techno: ${technoId}`);
    return res.status(200).json(techno);
  } catch (error) {
    logger.error(`Error fetching techno details for ${technoId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des détails de la techno :', error: handleError(error) });
  }
};

export const updateTechnoController = async (req: Request<{ technoId: string }>, res: Response) => {
  const { technoId } = req.params;
  try {
    const technoData = req.body as Partial<Techno>;

    const techno = await updateTechno(technoId, technoData);
    logger.info(`Techno updated successfully: ${technoId}`);
    return res.status(200).json(techno);
  } catch (error) {
    logger.error(`Error updating techno ${technoId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de la techno :', error: handleError(error) });
  }
};

export const deleteTechnoController = async (req: Request<{ technoId: string }>, res: Response) => {
  const { technoId } = req.params;
  try {
    await deleteTechno(technoId);
    logger.info(`Techno deleted successfully: ${technoId}`);
    return res.status(204).json({ message: 'Techno supprimée avec succès' });
  } catch (error) {
    logger.error(`Error deleting techno ${technoId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la suppression de la techno :', error: handleError(error) });
  }
};