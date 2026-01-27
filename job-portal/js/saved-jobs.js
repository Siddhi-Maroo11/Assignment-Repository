import { getBookmarkedJobs } from "./storage.js";
import { renderSavedJobs } from "./saved-render.js";

const savedJobs = getBookmarkedJobs();
renderSavedJobs(savedJobs);
