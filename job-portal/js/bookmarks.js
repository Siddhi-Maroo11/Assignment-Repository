import { getBookmarkedJobs, saveBookmarkedJobs } from "./storage.js";
import { showToast } from "./toast.js";

export function isBookmarked(jobId) {
  const bookmarkedJobs = getBookmarkedJobs();
  return bookmarkedJobs.some(bookmarkedJob => bookmarkedJob.id === jobId);
}

export function toggleBookmark(job) {
  if (!job || !job.id) {
    showToast("Invalid job data", "error");
    return;
  }

  const bookmarkedJobs = getBookmarkedJobs();
  const isAlreadyBookmarked = bookmarkedJobs.some(
    bookmarkedJob => bookmarkedJob.id === job.id
  );

  const updatedBookmarks = isAlreadyBookmarked
    ? bookmarkedJobs.filter(bookmarkedJob => bookmarkedJob.id !== job.id)
    : [...bookmarkedJobs, job];

  saveBookmarkedJobs(updatedBookmarks);

  showToast(
    isAlreadyBookmarked
      ? "Job removed from saved jobs"
      : "Job saved successfully",
    "success"
  );
}

