import { getAppliedJobs, saveAppliedJobs } from "./storage.js";

const jobGrid = document.getElementById("jobGrid");

function renderAppliedJobs(jobs) {
  jobGrid.innerHTML = "";

  if (!jobs.length) {
    jobGrid.innerHTML = "<p>No applied jobs</p>";
    return;
  }

  jobs.forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <button class="remove-applied-btn">✕</button>

      <h3>${job.title}</h3>
      <div class="job-meta">Company: ${job.company}</div>
      <div class="job-meta">Location: ${
        Array.isArray(job.location) ? job.location.join(", ") : job.location
      }</div>
      <div class="job-meta">Type: ${job.type}</div>

      <p class="job-desc">
        ${job.description ? job.description.slice(0, 90) : ""}
      </p>

      <a href="job-details.html?id=${job.id}" class="view-job-btn">
        View Job
      </a>
    `;

    const removeButton = card.querySelector(".remove-applied-btn");
    removeButton.addEventListener("click", () => {
      const updatedAppliedJobs = jobs.filter(appliedJob => appliedJob.id !== job.id);
      saveAppliedJobs(updatedAppliedJobs);
      renderAppliedJobs(updatedAppliedJobs);
    });

    jobGrid.appendChild(card);
  });
}

renderAppliedJobs(getAppliedJobs());
