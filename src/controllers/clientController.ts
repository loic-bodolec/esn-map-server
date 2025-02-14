/* eslint-disable max-len */
// TODO use express-validator to validate request body and query parameters (in routers and/or controllers)?
import { Request, Response } from 'express';
import logger from '../config/logger/logger';
import { createClient, deleteClient, getClientDetails, getClients, updateClient } from '../dataLayer/dao/clientDao';
import { Client } from '../dataLayer/entities/Client';
import { handleError } from '../utils/handleError';

export const createClientController = async (req: Request, res: Response) => {
  try {
    const { jobIds, expertiseIds, ...clientData } = req.body as Partial<Client> & { jobIds: string[] } & { expertiseIds: string[] };
    const client = await createClient(clientData, jobIds, expertiseIds);
    logger.info(`Client created successfully: ${client.id}`);
    return res.status(201).json(client);
  } catch (error) {
    logger.error(`Error creating client: ${error}`);
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
    logger.info(`Fetched ${clients.length} clients`);
    return res.status(200).json(clients);
  } catch (error) {
    logger.error(`Error fetching clients: ${error}`);
    return res.status(500).json({ message: 'Error fetching clients', error });
  }
};

export const getClientDetailsController = async (req: Request<{ clientId: string }>, res: Response) => {
  const { clientId } = req.params;
  try {

    const client = await getClientDetails(clientId);
    if (!client) {
      logger.warn(`Client not found: ${clientId}`);
      return res.status(404).json({ message: 'Client introuvable' });
    }

    logger.info(`Fetched details for client: ${clientId}`);
    return res.status(200).json(client);
  } catch (error) {
    logger.error(`Error fetching client details for ${clientId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des détails du client :', error: handleError(error) });
  }
};

export const updateClientController = async (req: Request<{ clientId: string }>, res: Response) => {
  const { clientId } = req.params;
  try {
    const { jobIds, expertiseIds, ...clientData } = req.body as Partial<Client> & { jobIds: string[] } & { expertiseIds: string[] };

    const client = await updateClient(clientId, clientData, jobIds, expertiseIds);
    logger.info(`Client updated successfully: ${clientId}`);
    return res.status(200).json(client);
  } catch (error) {
    logger.error(`Error updating client ${clientId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du client :', error: handleError(error) });
  }
};

export const deleteClientController = async (req: Request<{ clientId: string }>, res: Response) => {
  const { clientId } = req.params;
  try {
    await deleteClient(clientId);
    logger.info(`Client deleted successfully: ${clientId}`);
    return res.status(204).json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    logger.error(`Error deleting client ${clientId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la suppression du client :', error: handleError(error) });
  }
};