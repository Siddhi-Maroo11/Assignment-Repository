import { getBookmarkedJobs, saveBookmarkedJobs } from "./storage.js";
import { getUserProfile } from "./auth/userManager.js";
import { getLoggedInUser, getLoggedInUserProfile } from "./auth/sessionService.js";
import { showToast } from "./toast.js";

export function isBookmarked(jobId) {
  const email = getLoggedInUser();
  if (!email) return false;

  const user = getLoggedInUserProfile();
  if (!user) return false;

  return user.savedJobs.some(savedJob => savedJob.id === jobId);
}

export function toggleBookmark(job) {
  if (!job || !job.id) {
    showToast("Invalid job data", "error");
    return;
  }

  const email = getLoggedInUser();
  if (!email) {
    showToast("Please login first", "error");
    return;
  }

  const user = getLoggedInUserProfile();
  if (!user) return;

  const isAlreadySaved = user.savedJobs.some(savedJob => savedJob.id === job.id);

  user.savedJobs = isAlreadySaved
    ? user.savedJobs.filter(savedJob => savedJob.id !== job.id)
    : [...user.savedJobs, job];

  localStorage.setItem("USER_" + email, JSON.stringify(user));

  showToast(
    isAlreadySaved ? "Job removed from saved jobs" : "Job saved successfully",
    "success"
  );
}
