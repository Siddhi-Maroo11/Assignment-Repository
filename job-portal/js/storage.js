import { STORAGE_KEYS } from "./constant.js";

export function getAppliedJobs() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLIED_KEY)) ?? [];
}

export function saveAppliedJobs(jobs) {
  localStorage.setItem(STORAGE_KEYS.APPLIED_KEY, JSON.stringify(jobs));
}

export function addAppliedJob(job) {
  const appliedJobs = getAppliedJobs();
  if (!appliedJobs.find(job => job.id === job.id)) {
    appliedJobs.push(job);
    saveAppliedJobs(appliedJobs);
  }
}

export function getBookmarkedJobs() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARK_KEY)) ?? [];
}

export function saveBookmarkedJobs(jobs) {
  localStorage.setItem(STORAGE_KEYS.BOOKMARK_KEY, JSON.stringify(jobs));
}
