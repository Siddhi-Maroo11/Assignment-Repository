import { getAppliedJobs } from "./storage.js";

const container = document.getElementById("appliedJobs");
const appliedJobs = getAppliedJobs();

if (!appliedJobs.length) {
  container.innerHTML = `<p class="empty-message">No applied jobs yet</p>`;
}

appliedJobs.forEach(job => {
  container.innerHTML += `
    <div class="view-card">
      <h3>${job.title}</h3>
      <p>${job.company}</p>
    </div>
  `;
});
