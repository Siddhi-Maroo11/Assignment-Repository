import { state } from "./state.js";
import { renderPagination } from "./pagination.js";

const jobGrid = document.getElementById("jobGrid");

export function renderJobs() {
  jobGrid.innerHTML = "";

if (state.filteredJobs.length === 0) {
  jobGrid.innerHTML = `
    <div class="no-jobs-wrapper">
      <div class="no-jobs-card">
        <h3>No jobs found</h3>
        <p>
          Try changing your search keywords or filters.
        </p>
      </div>
    </div>
  `;
  return;
}

  const startIndex = (state.currentPage - 1) * state.jobsPerPage;
  const endIndex = startIndex + state.jobsPerPage;

  state.filteredJobs.slice(startIndex, endIndex).forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <h3>${job.title}</h3>
      <div class="job-meta">Company: ${job.company}</div>
      <div class="job-meta">Location: ${job.location.join(", ")}</div>
      <div class="job-meta">Type: ${job.type}</div>
      <p class="job-desc">${job.description.slice(0, 90)}...</p>
      <a href="job-details.html?id=${job.id}" target="_blank" class="view-job-btn">View Job</a>

    `;

    jobGrid.appendChild(card);
  });

  renderPagination();
}
