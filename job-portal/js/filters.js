import { state } from "./state.js";
import { renderJobs } from "./jobs.js";

const filterType = document.getElementById("filterType");
const filterLocation = document.getElementById("filterLocation");
const filterExperience = document.getElementById("filterExperience");

function saveFiltersToSession() {
  sessionStorage.setItem(
    "jobFilters",
    JSON.stringify({
      searchText: state.searchText,
      selectedType: state.selectedType,
      selectedLocation: state.selectedLocation,
      selectedExperience: state.selectedExperience,
      currentPage: state.currentPage
    })
  );
}

export function restoreFilterState() {
  const saved = sessionStorage.getItem("jobFilters");
  if (!saved) return;

  const filters = JSON.parse(saved);

  state.searchText = filters.searchText || "";
  state.selectedType = filters.selectedType || "";
  state.selectedLocation = filters.selectedLocation || "";
  state.selectedExperience = filters.selectedExperience || "";
  state.currentPage = filters.currentPage || 1;
}

export function populateFilters(jobs) {
  const locations = [...new Set(jobs.flatMap(job => job.location))];
  const types = [...new Set(jobs.map(job => job.type))];
  const experiences = [...new Set(jobs.map(job => job.experience))];

  locations.forEach(location => {
    filterLocation.innerHTML += `<option value="${location}">${location}</option>`;
  });

  types.forEach(type => {
    filterType.innerHTML += `<option value="${type}">${type}</option>`;
  });

  experiences.forEach(exp => {
    filterExperience.innerHTML += `<option value="${exp}">${exp}</option>`;
  });

  filterType.value = state.selectedType;
  filterLocation.value = state.selectedLocation;
  filterExperience.value = state.selectedExperience;

  document.getElementById("searchInput").value = state.searchText;
}

export function applySearchAndFilters() {
  const searchValue = state.searchText.toLowerCase();

  state.filteredJobs = state.jobs.filter(job => {
    const { title, company, type, location, experience } = job;
    const searchableText = `
      ${title}
      ${company}
      ${type}
      ${location.join(" ")}
    `.toLowerCase();

    return (
      searchableText.includes(searchValue) &&
      (state.selectedType === "" || job.type === state.selectedType) &&
      (state.selectedLocation === "" || job.location.includes(state.selectedLocation)) &&
      (state.selectedExperience === "" || job.experience === state.selectedExperience)
    );
  });

  state.currentPage = 1;

  saveFiltersToSession();
  renderJobs();
}
