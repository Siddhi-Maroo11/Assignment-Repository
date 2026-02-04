import { getLoggedInUser } from "./auth/sessionService.js";
import { getUserProfile } from "./auth/userManager.js";

export function getAppliedJobs() {
  const email = getLoggedInUser();
  if (!email) return [];

  const user = getUserProfile(email);
  return Array.isArray(user?.appliedJobs) ? user.appliedJobs : [];
}

export function saveAppliedJobs(jobs) {
  const email = getLoggedInUser();
  if (!email) return;

  const user = getUserProfile(email);
  if (!user) return;

  user.appliedJobs = jobs;
  localStorage.setItem("USER_" + email, JSON.stringify(user));
}

export function addAppliedJob(job) {
  if (!job || !job.id) return;

  const appliedJobs = getAppliedJobs();
  if (!appliedJobs.some(job => job.id === job.id)) {
    appliedJobs.push({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      appliedAt: new Date().toISOString()
    });
    saveAppliedJobs(appliedJobs);
  }
}

export function removeAppliedJob(jobId) {
  if (!jobId) return;

  const appliedJobs = getAppliedJobs().filter(job => job.id !== jobId);
  saveAppliedJobs(appliedJobs);
}

export function getBookmarkedJobs() {
  const email = getLoggedInUser();
  if (!email) return [];

  const user = getUserProfile(email);
  return Array.isArray(user?.savedJobs) ? user.savedJobs : [];
}

export function saveBookmarkedJobs(jobs) {
  const email = getLoggedInUser();
  if (!email) return;

  const user = getUserProfile(email);
  if (!user) return;

  user.savedJobs = jobs;
  localStorage.setItem("USER_" + email, JSON.stringify(user));
}

export function addBookmarkedJob(job) {
  if (!job || !job.id) return;

  const savedJobs = getBookmarkedJobs();
  if (!savedJobs.some(job => job.id === job.id)) {
    savedJobs.push({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      savedAt: new Date().toISOString()
    });
    saveBookmarkedJobs(savedJobs);
  }
}

export function removeBookmarkedJob(jobId) {
  if (!jobId) return;

  const savedJobs = getBookmarkedJobs().filter(job => job.id !== jobId);
  saveBookmarkedJobs(savedJobs);
}
