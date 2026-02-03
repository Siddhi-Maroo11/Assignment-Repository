import { saveBookmarkedJobs } from "./storage.js";

const jobGrid = document.getElementById("jobGrid");

export function renderSavedJobs(jobs) {
  jobGrid.innerHTML = "";

  if (!jobs.length) {
    jobGrid.innerHTML = "<p>No saved jobs</p>";
    return;
  }

  jobs.forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <button class="remove-saved-btn">✕</button>

      <h3>${job.title}</h3>
      <div class="job-meta">Company: ${job.company}</div>
      <div class="job-meta">Location: ${job.location.join(", ")}</div>
      <div class="job-meta">Type: ${job.type}</div>

      <p class="job-desc">
        ${job.description.slice(0, 90)}...
      </p>

      <a href="job-details.html?id=${job.id}" class="view-job-btn">
        View Job
      </a>
    `;

    const removeButton = card.querySelector(".remove-saved-btn");

    removeButton.addEventListener("click", () => {
      const updatedJobs = jobs.filter(
        savedJob => savedJob.id !== job.id
      );

      saveBookmarkedJobs(updatedJobs);
      renderSavedJobs(updatedJobs);
    });

    jobGrid.appendChild(card);
  });
}
