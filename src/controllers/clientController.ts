/* eslint-disable max-len */
import { Request, Response } from 'express';
import { createClient, deleteClient, getClientDetails, getClients, updateClient } from '../dataLayer/dao/clientDao';
import { Client } from '../dataLayer/entities/Client';
import { handleError } from '../utils/handleError';

export const createClientController = async (req: Request, res: Response) => {
  try {
    const { jobIds, expertiseIds, ...clientData } = req.body as Partial<Client> & { jobIds: string[] } & { expertiseIds: string[] };
    const client = await createClient(clientData, jobIds, expertiseIds);
    return res.status(201).json(client);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la création du client :', error: handleError(error) });
  }
};

export const getClientsController = async (req: Request, res: Response): Promise<Response> => {
  const { jobIds, expertiseIds } = req.query;

  let jobIdsArray: any = [];
  if (jobIds) {
    jobIdsArray = Array.isArray(jobIds) ? jobIds : [jobIds];
  }
  let expertiseIdsArray: any = [];
  if (expertiseIds) {
    expertiseIdsArray = Array.isArray(expertiseIds) ? expertiseIds : [expertiseIds];
  }
  try {
    const clients = await getClients(jobIdsArray, expertiseIdsArray);
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching clients', error });
  }
};

export const getClientDetailsController = async (req: Request<{ clientId: string }>, res: Response) => {
  try {
    const { clientId } = req.params;

    const client = await getClientDetails(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client introuvable' });
    }

    return res.status(200).json(client);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des détails du client :', error: handleError(error) });
  }
};

export const updateClientController = async (req: Request<{ clientId: string }>, res: Response) => {
  try {
    const { clientId } = req.params;
    const { jobIds, expertiseIds, ...clientData } = req.body as Partial<Client> & { jobIds: string[] } & { expertiseIds: string[] };

    const client = await updateClient(clientId, clientData, jobIds, expertiseIds);
    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du client :', error: handleError(error) });
  }
};

export const deleteClientController = async (req: Request<{ clientId: string }>, res: Response) => {
  try {
    const { clientId } = req.params;
    await deleteClient(clientId);
    return res.status(204).json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression du client :', error: handleError(error) });
  }
};
