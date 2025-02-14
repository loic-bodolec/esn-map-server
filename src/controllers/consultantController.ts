/* eslint-disable max-len */
import { Request, Response } from 'express';
import logger from '../config/logger/logger';
import { createConsultant, deleteConsultant, getConsultantDetails, getConsultants, updateConsultant } from '../dataLayer/dao/consultantDao';
import { Consultant } from '../dataLayer/entities/Consultant';
import { handleError } from '../utils/handleError';

export const createConsultantController = async (req: Request, res: Response) => {
  try {
    const { technoIds, workId, clientId, ...consultantData } = req.body as Partial<Consultant> & { technoIds: string[] } & { workId: string } & { clientId: string };
    const consultant = await createConsultant(consultantData, technoIds, workId, clientId);
    logger.info(`Consultant created successfully: ${consultant.id}`);
    return res.status(201).json(consultant);
  } catch (error) {
    logger.error(`Error creating consultant: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la création du consultant :', error: handleError(error) });
  }
};

export const getConsultantsController = async (req: Request, res: Response): Promise<Response> => {
  const { technoIds, workIds, clientIds } = req.query;

  let technoIdsArray: any = [];
  if (technoIds) {
    technoIdsArray = Array.isArray(technoIds) ? technoIds : [technoIds];
  }
  let workIdsArray: any = [];
  if (workIds) {
    workIdsArray = Array.isArray(workIds) ? workIds : [workIds];
  }
  let clientIdsArray: any = [];
  if (clientIds) {
    clientIdsArray = Array.isArray(clientIds) ? clientIds : [clientIds];
  }
  try {
    const consultants = await getConsultants(technoIdsArray, workIdsArray, clientIdsArray);
    logger.info(`Fetched ${consultants.length} consultants`);
    return res.status(200).json(consultants);
  } catch (error) {
    logger.error(`Error fetching consultants: ${error}`);
    return res.status(500).json({ message: 'Error fetching consultants', error });
  }
};

export const getConsultantDetailsController = async (req: Request<{ consultantId: string }>, res: Response) => {
  const { consultantId } = req.params;
  try {
    const consultant = await getConsultantDetails(consultantId);
    if (!consultant) {
      logger.warn(`Consultant not found: ${consultantId}`);
      return res.status(404).json({ message: 'Consultant introuvable' });
    }

    logger.info(`Fetched details for consultant: ${consultantId}`);
    return res.status(200).json(consultant);
  } catch (error) {
    logger.error(`Error fetching consultant details for ${consultantId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des détails du consultant :', error: handleError(error) });
  }
};

export const updateConsultantController = async (req: Request<{ consultantId: string }>, res: Response) => {
  const { consultantId } = req.params;
  try {
    const { technoIds, workId, clientId, ...consultantData } = req.body as Partial<Consultant> & { technoIds: string[] } & { workId: string } & { clientId: string };

    const consultant = await updateConsultant(consultantId, consultantData, technoIds, workId, clientId);
    logger.info(`Consultant updated successfully: ${consultantId}`);
    return res.status(200).json(consultant);
  } catch (error) {
    logger.error(`Error updating consultant ${consultantId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du consultant :', error: handleError(error) });
  }
};

export const deleteConsultantController = async (req: Request<{ consultantId: string }>, res: Response) => {
  const { consultantId } = req.params;
  try {
    await deleteConsultant(consultantId);
    logger.info(`Consultant deleted successfully: ${consultantId}`);
    return res.status(204).json({ message: 'Consultant supprimé avec succès' });
  } catch (error) {
    logger.error(`Error deleting consultant ${consultantId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la suppression du consultant :', error: handleError(error) });
  }
};