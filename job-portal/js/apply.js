import { getAppliedJobs, saveAppliedJobs } from "./storage.js";

export function applyForJob(job) {
  if (!job || !job.id) return false;

  const appliedJobs = getAppliedJobs();

  const alreadyApplied = appliedJobs.some(
    appliedJob => appliedJob.id === job.id
  );

  if (alreadyApplied) {
    return false;
  }

  appliedJobs.push({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    description: job.description,
    appliedAt: new Date().toISOString()
  });

  saveAppliedJobs(appliedJobs);
  return true;
}
