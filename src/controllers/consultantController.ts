/* eslint-disable max-len */
import { Request, Response } from 'express';
import { createConsultant, deleteConsultant, getConsultantDetails, getConsultants, updateConsultant } from '../dataLayer/dao/consultantDao';
import { Consultant } from '../dataLayer/entities/Consultant';
import { handleError } from '../utils/handleError';

export const createConsultantController = async (req: Request, res: Response) => {
  try {
    const { technoIds, workId, clientId, ...consultantData } = req.body as Partial<Consultant> & { technoIds: string[] } & { workId: string } & { clientId: string };
    const consultant = await createConsultant(consultantData, technoIds, workId, clientId);
    return res.status(201).json(consultant);
  } catch (error) {
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
    return res.status(200).json(consultants);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des consultants', error });
  }
};

export const getConsultantDetailsController = async (req: Request<{ consultantId: string }>, res: Response) => {
  try {
    const { consultantId } = req.params;

    const consultant = await getConsultantDetails(consultantId);
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant non trouvé' });
    }

    return res.status(200).json(consultant);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des détails du consultant :', error: handleError(error) });
  }
};

export const updateConsultantController = async (req: Request<{ consultantId: string }>, res: Response) => {
  try {
    const { consultantId } = req.params;
    const { technoIds, workId, clientId, ...consultantData } = req.body as Partial<Consultant> & { technoIds: string[] } & { workId: string } & { clientId: string };

    const consultant = await updateConsultant(consultantId, consultantData, technoIds, workId, clientId);
    return res.status(200).json(consultant);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du consultant :', error: handleError(error) });
  }
};

export const deleteConsultantController = async (req: Request<{ consultantId: string }>, res: Response) => {
  try {
    const { consultantId } = req.params;
    await deleteConsultant(consultantId);
    return res.status(204).json({ message: 'Consultant supprimé avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression du consultant :', error: handleError(error) });
  }
};
