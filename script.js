const state = {
  jobs: [],
  filteredJobs: [],
  searchText: "",
  selectedType: "",
  selectedLocation: "",
  selectedExperience: "",
  currentPage: 1
};

const jobsPerPage = 4;

const jobGrid = document.getElementById("jobGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const filterType = document.getElementById("filterType");
const filterLocation = document.getElementById("filterLocation");
const filterExperience = document.getElementById("filterExperience");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const jobListPage = document.getElementById("jobListPage");
const jobDetailsPage = document.getElementById("jobDetailsPage");
const jobDetailsContent = document.getElementById("jobDetailsContent");
const detailsTitle = document.getElementById("detailsTitle");
const detailsCompany = document.getElementById("detailsCompany");

function saveState() {
  localStorage.setItem(
    "jobPortalState",
    JSON.stringify({
      searchText: state.searchText,
      selectedType: state.selectedType,
      selectedLocation: state.selectedLocation,
      selectedExperience: state.selectedExperience,
      currentPage: state.currentPage
    })
  );
}

function loadState() {
  const savedState = localStorage.getItem("jobPortalState");
  if (!savedState) return;
  const parsedState = JSON.parse(savedState);
  state.searchText = parsedState.searchText || "";
  state.selectedType = parsedState.selectedType || "";
  state.selectedLocation = parsedState.selectedLocation || "";
  state.selectedExperience = parsedState.selectedExperience || "";
  state.currentPage = parsedState.currentPage || 1;
}

function syncUIWithState() {
  searchInput.value = state.searchText;
  filterType.value = state.selectedType;
  filterLocation.value = state.selectedLocation;
  filterExperience.value = state.selectedExperience;
  clearSearch.classList.toggle("hidden", !state.searchText);
}

fetch("jobs.json")
  .then(response => response.json())
  .then(jobData => {
    state.jobs = jobData;
    populateFilters(jobData);
    loadState();
    syncUIWithState();
    applySearchAndFilters();
  });

function populateFilters(jobs) {
  const locations = [...new Set(jobs.flatMap(job => job.location))];
  const jobTypes = [...new Set(jobs.map(job => job.type))];
  const experienceLevels = [...new Set(jobs.map(job => job.experience))];

  locations.forEach(location => {
    filterLocation.innerHTML += `<option value="${location}">${location}</option>`;
  });

  jobTypes.forEach(type => {
    filterType.innerHTML += `<option value="${type}">${type}</option>`;
  });

  experienceLevels.forEach(experience => {
    filterExperience.innerHTML += `<option value="${experience}">${experience}</option>`;
  });
}

function applySearchAndFilters() {
  const searchValue = state.searchText.toLowerCase();

  state.filteredJobs = state.jobs.filter(job => {
    const searchableText = `
      ${job.title}
      ${job.company}
      ${job.type}
      ${job.location.join(" ")}
    `.toLowerCase();

    return (
      searchableText.includes(searchValue) &&
      (state.selectedType === "" || job.type === state.selectedType) &&
      (state.selectedLocation === "" || job.location.includes(state.selectedLocation)) &&
      (state.selectedExperience === "" || job.experience === state.selectedExperience)
    );
  });

  state.currentPage = 1;
  renderJobs();
  saveState();
}

function renderJobs() {
  jobGrid.innerHTML = "";

  const startIndex = (state.currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;

  state.filteredJobs.slice(startIndex, endIndex).forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";

    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <div class="job-meta">${job.location.join(", ")}</div>
      <div class="job-meta">${job.type}</div>
      <p class="job-desc">${job.description.slice(0, 90)}...</p>
    `;

    jobCard.addEventListener("click", () => openJobDetails(job.id));
    jobGrid.appendChild(jobCard);
  });
}

function openJobDetails(jobId) {
  const selectedJob = state.jobs.find(job => job.id === jobId);
  if (!selectedJob) return;

  jobListPage.classList.add("hidden");
  jobDetailsPage.classList.remove("hidden");

  detailsTitle.textContent = selectedJob.title;
  detailsCompany.textContent = selectedJob.company;

  jobDetailsContent.innerHTML = `
    <button class="close-btn" id="closeDetails">✕</button>

    <div class="detail-row">
      <span class="label">Job Description:</span>
      <span>${selectedJob.description}</span>
    </div>

    <div class="detail-row">
      <span class="label">Designation:</span>
      <span>${selectedJob.designation}</span>
    </div>

    <div class="detail-row">
      <span class="label">Experience:</span>
      <span>${selectedJob.experience}</span>
    </div>

    <div class="detail-row">
      <span class="label">Location:</span>
      <span>${selectedJob.location.join(", ")}</span>
    </div>

    <div class="detail-row">
      <span class="label">Job Type:</span>
      <span>${selectedJob.type}</span>
    </div>

    <div class="detail-section">
      <h3>Responsibilities</h3>
      <ul>
        ${selectedJob.responsibilities.map(r => `<li>${r}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-section">
      <h3>Skills Required</h3>
      <ul>
        ${selectedJob.skills.map(s => `<li>${s}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-footer">
      <button class="apply-btn">Apply</button>
    </div>
  `;
}

searchInput.addEventListener("input", event => {
  state.searchText = event.target.value;
  clearSearch.classList.toggle("hidden", !event.target.value);
  applySearchAndFilters();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  state.searchText = "";
  clearSearch.classList.add("hidden");
  applySearchAndFilters();
});

filterType.addEventListener("change", event => {
  state.selectedType = event.target.value;
  applySearchAndFilters();
});

filterLocation.addEventListener("change", event => {
  state.selectedLocation = event.target.value;
  applySearchAndFilters();
});

filterExperience.addEventListener("change", event => {
  state.selectedExperience = event.target.value;
  applySearchAndFilters();
});

nextBtn.addEventListener("click", () => {
  if (state.currentPage * jobsPerPage < state.filteredJobs.length) {
    state.currentPage++;
    renderJobs();
    saveState();
  }
});

prevBtn.addEventListener("click", () => {
  if (state.currentPage > 1) {
    state.currentPage--;
    renderJobs();
    saveState();
  }
});

jobDetailsContent.addEventListener("click", event => {
  if (event.target.id === "closeDetails") {
    jobDetailsPage.classList.add("hidden");
    jobListPage.classList.remove("hidden");
  }
});
