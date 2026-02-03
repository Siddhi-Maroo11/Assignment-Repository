import { addAppliedJob, removeAppliedJob, getAppliedJobs } from "./storage.js";
import { getLoggedInUser } from "./auth/sessionService.js";

export function applyForJob(job) {
  if (!job || !job.id) return false;

  const email = getLoggedInUser();
  if (!email) return false; 

  addAppliedJob({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    appliedAt: new Date().toISOString()
  });

  return true;
}

export function cancelAppliedJob(jobId) {
  if (!jobId) return false;

  const email = getLoggedInUser();
  if (!email) return false;

  removeAppliedJob(jobId);
  return true;
}

export function getAllAppliedJobs() {
  const email = getLoggedInUser();
  if (!email) return [];

  return getAppliedJobs();
}
