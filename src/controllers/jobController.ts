/* eslint-disable max-len */
import { Request, Response } from 'express';
import logger from '../config/logger/logger';
import { createJob, deleteJob, getJobDetails, getJobs, updateJob } from '../dataLayer/dao/jobDao';
import { Job } from '../dataLayer/entities/Job';
import { handleError } from '../utils/handleError';

export const createJobController = async (req: Request, res: Response) => {
  try {
    const jobData = req.body as Partial<Job>;

    if (!jobData.jobName || jobData.jobName.trim() === '') {
      return res.status(400).json({ message: 'Le champ "jobName" est requis et ne peut pas être vide.' });
    }

    const job = await createJob(jobData);
    logger.info(`Job created successfully: ${job.id}`);
    return res.status(201).json(job);
  } catch (error) {
    logger.error(`Error creating job: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la création du job :', error: handleError(error) });
  }
};

export const getJobsController = async (_req: Request, res: Response) => {
  try {
    const jobs = await getJobs();
    logger.info(`Fetched ${jobs.length} jobs`);
    return res.status(200).json(jobs);
  } catch (error) {
    logger.error(`Error fetching jobs: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des jobs :', error: handleError(error) });
  }
};

export const getJobDetailsController = async (req: Request<{ jobId: string }>, res: Response) => {
  const { jobId } = req.params;
  try {
    const job = await getJobDetails(jobId);
    if (!job) {
      logger.warn(`Job not found: ${jobId}`);
      return res.status(404).json({ message: 'Job non trouvé' });
    }

    logger.info(`Fetched details for job: ${jobId}`);
    return res.status(200).json(job);
  } catch (error) {
    logger.error(`Error fetching job details for ${jobId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des détails du job :', error: handleError(error) });
  }
};

export const updateJobController = async (req: Request<{ jobId: string }>, res: Response) => {
  const { jobId } = req.params;
  try {
    const jobData = req.body as Partial<Job>;

    const job = await updateJob(jobId, jobData);
    logger.info(`Job updated successfully: ${jobId}`);
    return res.status(200).json(job);
  } catch (error) {
    logger.error(`Error updating job ${jobId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du job :', error: handleError(error) });
  }
};

export const deleteJobController = async (req: Request<{ jobId: string }>, res: Response) => {
  const { jobId } = req.params;
  try {
    await deleteJob(jobId);
    logger.info(`Job deleted successfully: ${jobId}`);
    return res.status(204).json({ message: 'Job supprimé avec succès' });
  } catch (error) {
    logger.error(`Error deleting job ${jobId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la suppression du job :', error: handleError(error) });
  }
};