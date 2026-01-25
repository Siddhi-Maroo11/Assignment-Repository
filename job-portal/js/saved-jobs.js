import { getBookmarkedJobs } from "./storage.js";

const container = document.getElementById("savedJobs");
const savedJobs = getBookmarkedJobs();

if (!savedJobs.length) {
  container.innerHTML = `<p class="empty-message">No saved jobs yet</p>`;
}

savedJobs.forEach(job => {
  container.innerHTML += `
    <div class="view-card">
      <h3>${job.title}</h3>
      <p>${job.company}</p>
    </div>
  `;
});
