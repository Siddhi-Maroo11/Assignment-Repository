const APPLIED_KEY = "appliedJobs";
const BOOKMARK_KEY = "bookmarkedJobs";

export function getAppliedJobs() {
  return JSON.parse(localStorage.getItem(APPLIED_KEY)) ?? [];
}

export function saveAppliedJobs(jobs) {
  localStorage.setItem(APPLIED_KEY, JSON.stringify(jobs));
}

export function getBookmarkedJobs() {
  return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) ?? [];
}

export function saveBookmarkedJobs(jobs) {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(jobs));
}
