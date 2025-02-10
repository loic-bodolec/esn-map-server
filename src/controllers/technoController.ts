/* eslint-disable max-len */
import { Request, Response } from 'express';
import { createTechno, deleteTechno, getTechnoDetails, getTechnos, updateTechno } from '../dataLayer/dao/technoDao';
import { Techno } from '../dataLayer/entities/Techno';
import { handleError } from '../utils/handleError';

export const createTechnoController = async (req: Request, res: Response) => {
  try {
    const technoData = req.body as Partial<Techno>;
    const techno = await createTechno(technoData);
    return res.status(201).json(techno);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la création de la techno :', error: handleError(error) });
  }
};

export const getTechnosController = async (_req: Request, res: Response) => {
  try {
    const technos = await getTechnos();
    return res.status(200).json(technos);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des technos :', error: handleError(error) });
  }
};

export const getTechnoDetailsController = async (req: Request<{ technoId: string }>, res: Response) => {
  try {
    const { technoId } = req.params;

    const techno = await getTechnoDetails(technoId);
    if (!techno) {
      return res.status(404).json({ message: 'Techno non trouvée' });
    }

    return res.status(200).json(techno);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des détails de la techno :', error: handleError(error) });
  }
};

export const updateTechnoController = async (req: Request<{ technoId: string }>, res: Response) => {
  try {
    const { technoId } = req.params;
    const technoData = req.body as Partial<Techno>;

    const techno = await updateTechno(technoId, technoData);
    return res.status(200).json(techno);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de la techno :', error: handleError(error) });
  }
};

export const deleteTechnoController = async (req: Request<{ technoId: string }>, res: Response) => {
  try {
    const { technoId } = req.params;
    await deleteTechno(technoId);
    return res.status(204).json({ message: 'Techno supprimée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression de la techno :', error: handleError(error) });
  }
};
