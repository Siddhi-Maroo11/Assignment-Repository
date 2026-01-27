import { getAppliedJobs } from "./storage.js";

const jobGrid = document.getElementById("jobGrid");

function renderAppliedJobs(jobs) {
  jobGrid.innerHTML = "";

  if (!jobs.length) {
    jobGrid.innerHTML = "<p>No applied jobs</p>";
    return;
  }

  jobs.forEach(job => {
    const locationText = Array.isArray(job.location) ? job.location.join(", ") : job.location;

    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.title}</h3>
      <div class="job-meta">Company: ${job.company}</div>
      <div class="job-meta">Location: ${locationText}</div>
      <div class="job-meta">Type: ${job.type}</div>
      <p class="job-desc">${job.description.slice(0, 90)}...</p>
      <a href="job-details.html?id=${job.id}" class="view-job-btn">View Job</a>
    `;

    jobGrid.appendChild(card);
  });
}

renderAppliedJobs(getAppliedJobs());
