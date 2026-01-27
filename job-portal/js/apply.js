import { getAppliedJobs, saveAppliedJobs } from "./storage.js";

export function applyForJob(job) {
  const appliedJobs = getAppliedJobs();

  if (appliedJobs.some(j => j.id === job.id)) {
    alert("You have already applied for this job");
    return;
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
  alert("Job applied successfully ✅");
}
