/* eslint-disable max-len */
import { Request, Response } from 'express';
import { createJob, deleteJob, getJobDetails, getJobs, updateJob } from '../dataLayer/dao/jobDao';
import { Job } from '../dataLayer/entities/Job';
import { handleError } from '../utils/handleError';

export const createJobController = async (req: Request, res: Response) => {
  try {
    const jobData = req.body as Partial<Job>;
    const job = await createJob(jobData);
    return res.status(201).json(job);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la création du job :', error: handleError(error) });
  }
};

export const getJobsController = async (_req: Request, res: Response) => {
  try {
    const jobs = await getJobs();
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des jobs :', error: handleError(error) });
  }
};

export const getJobDetailsController = async (req: Request<{ jobId: string }>, res: Response) => {
  try {
    const { jobId } = req.params;

    const job = await getJobDetails(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job non trouvé' });
    }

    return res.status(200).json(job);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des détails du job :', error: handleError(error) });
  }
};

export const updateJobController = async (req: Request<{ jobId: string }>, res: Response) => {
  try {
    const { jobId } = req.params;
    const jobData = req.body as Partial<Job>;

    const job = await updateJob(jobId, jobData);
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du job :', error: handleError(error) });
  }
};

export const deleteJobController = async (req: Request<{ jobId: string }>, res: Response) => {
  try {
    const { jobId } = req.params;
    await deleteJob(jobId);
    return res.status(204).json({ message: 'Job supprimé avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression du job :', error: handleError(error) });
  }
};
