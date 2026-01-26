import { state } from "./state.js";
import { populateFilters, restoreFilterState, applySearchAndFilters } from "./filters.js";

export function fetchJobs() {
  fetch("data/jobs.json")
    .then(response => response.json())
    .then(jobData => {
      state.jobs = jobData;
      state.filteredJobs = jobData;
      restoreFilterState();
      populateFilters(jobData);
      applySearchAndFilters();
    });
}

