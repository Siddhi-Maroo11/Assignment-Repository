import { getBookmarkedJobs, saveBookmarkedJobs } from "./storage.js";

export function isBookmarked(jobId) {
  const bookmarks = getBookmarkedJobs();
  return bookmarks.some(job => job.id === jobId);
}

export function toggleBookmark(job) {
  try {
    if (!job?.id) throw new Error("Invalid job");

    const bookmarks = getBookmarkedJobs();
    const exists = bookmarks.some(j => j.id === job.id);

    const updated = exists
      ? bookmarks.filter(j => j.id !== job.id)
      : [...bookmarks, job];

    saveBookmarkedJobs(updated);
  } catch (err) {
    console.error(err);
  }
}
