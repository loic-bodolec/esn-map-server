import HttpException from '../../core/exceptions/HttpException';
import NotFoundException from '../../core/exceptions/NotFoundException';
import { Job } from '../entities/Job';
import { jobRepository } from '../repositories/jobRepository';

export const createJob = async (jobData: Partial<Job>) => {
  // Vérifier si le job existe déjà
  const existingJob = await jobRepository().findOne({ where: {
    jobName: jobData.jobName,
  } });
  if (existingJob) {
    throw new HttpException('Un job avec ce nom existe déjà.', 409);
  }
  const job = jobRepository().create(jobData);
  return jobRepository().save(job);
};

export const getJobs = async () => jobRepository().find();

export const getJobDetails = async (jobId: string) => {
  const job = await jobRepository().findOne({
    where: { id: parseInt(jobId, 10) },
  });
  if (!job) {
    throw new NotFoundException('Job');
  }
  return job;
};

export const updateJob = async (jobId: string, jobData: Partial<Job>) => {
  const job = await jobRepository().findOne({
    where: { id: parseInt(jobId, 10) },
  });
  if (!job) {
    throw new NotFoundException('Job');
  }

  Object.assign(job, jobData);

  return jobRepository().save(job);
};

export const deleteJob = async (jobId: string) => {
  const job = await jobRepository().findOne({ where: { id: parseInt(jobId, 10) } });

  if (!job) {
    throw new NotFoundException('Job');
  }

  return jobRepository().delete({ id: parseInt(jobId, 10) });
};
