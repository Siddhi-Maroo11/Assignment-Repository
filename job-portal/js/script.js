import { state } from "./state.js";
import { fetchJobs } from "./api.js";
import { applySearchAndFilters } from "./filters.js";

const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const filterType = document.getElementById("filterType");
const filterLocation = document.getElementById("filterLocation");
const filterExperience = document.getElementById("filterExperience");

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

fetchJobs();
