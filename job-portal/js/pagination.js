import { state } from "./state.js";
import { renderJobs } from "./jobs.js";

const paginationContainer = document.querySelector(".pagination");

export function renderPagination() {
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(
    state.filteredJobs.length / state.jobsPerPage
  );

  if (totalPages <= 1) return;

  const createButton = (label, targetPage, isArrow = false) => {
    const button = document.createElement("button");
    button.textContent = label;

    button.onclick = () => {
      state.currentPage = targetPage;
      renderJobs();
    };

    if (isArrow) button.classList.add("arrow-btn");
    if (targetPage === state.currentPage && !isArrow) {
      button.classList.add("active");
    }

    return button;
  };

  if (state.currentPage > 1) {
    paginationContainer.appendChild(
      createButton("←", state.currentPage - 1, true)
    );
  }

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `${state.currentPage} of ${totalPages}`;
  pageInfo.classList.add("page-info");
  paginationContainer.appendChild(pageInfo);

  if (state.currentPage < totalPages) {
    paginationContainer.appendChild(
      createButton("→", state.currentPage + 1, true)
    );
  }
}
