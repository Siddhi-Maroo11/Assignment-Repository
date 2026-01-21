import { state } from "./state.js";
import { renderJobs } from "./jobs.js";

const paginationContainer = document.querySelector(".pagination");

export function renderPagination() {
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(
    state.filteredJobs.length / state.jobsPerPage
  );

  if (totalPages <= 1) return;

  const prevButton = document.createElement("button");
  prevButton.textContent = "<";
  prevButton.disabled = state.currentPage === 1;
  prevButton.onclick = () => {
    state.currentPage--;
    renderJobs();
  };
  paginationContainer.appendChild(prevButton);

  for (let page = 1; page <= totalPages; page++) {
    const btn = document.createElement("button");
    btn.textContent = page;

    if (page === state.currentPage) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      state.currentPage = page;
      renderJobs();
    };

    paginationContainer.appendChild(btn);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.disabled = state.currentPage === totalPages;
  nextButton.onclick = () => {
    state.currentPage++;
    renderJobs();
  };
  paginationContainer.appendChild(nextButton);
}
