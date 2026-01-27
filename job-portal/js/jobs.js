import { state } from "./state.js";
import { renderPagination } from "./pagination.js";
import { sortJobs } from "./sort.js";
import { toggleBookmark, isBookmarked } from "./bookmarks.js";

const jobGrid = document.getElementById("jobGrid");

export function renderJobs() {
  jobGrid.innerHTML = "";

  if (state.filteredJobs.length === 0) {
    jobGrid.innerHTML = `
      <div class="no-jobs-wrapper">
        <div class="no-jobs-card">
          <h3>No jobs found</h3>
        </div>
      </div>
    `;
    return;
  }

  const sortedJobs = sortJobs(state.filteredJobs, state.sortBy);

  const startIndex = (state.currentPage - 1) * state.jobsPerPage;
  const endIndex = startIndex + state.jobsPerPage;

  sortedJobs.slice(startIndex, endIndex).forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <h3>${job.title}</h3>
      <div class="job-meta">Company: ${job.company}</div>
      <div class="job-meta">Location: ${job.location.join(", ")}</div>
      <div class="job-meta">Type: ${job.type}</div>

      <p class="job-desc">${job.description.slice(0, 90)}...</p>

   <div class="job-actions">
      <a href="job-details.html?id=${job.id}" class="view-job-btn">
        View Job
       </a>

      <button class="bookmark-btn">
         <svg class="bookmark-icon" viewBox="0 0 24 24">
           <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 5V4a2 2 0 0 1 2-2z"/>
         </svg>
      </button>
   </div>

    `;

    const bookmarkBtn = card.querySelector(".bookmark-btn");

    if (isBookmarked(job.id)) {
      bookmarkBtn.classList.add("active");
    }

    bookmarkBtn.addEventListener("click", () => {
      toggleBookmark(job);
      bookmarkBtn.classList.toggle("active");
    });

    jobGrid.appendChild(card);
  });

  renderPagination();
}
