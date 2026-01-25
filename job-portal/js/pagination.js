import { state } from "./state.js";
import { renderJobs } from "./jobs.js";

const paginationContainer = document.querySelector(".pagination");

export function renderPagination() {
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(
    state.filteredJobs.length / state.jobsPerPage
  );

  if (totalPages <= 1) return;

  const createButton = (label, page) => {
    const btn = document.createElement("button");
    btn.textContent = label;

    if (page === state.currentPage) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      state.currentPage = page;
      renderJobs();
    };

    return btn;
  };

  const createDots = () => {
    const span = document.createElement("span");
    span.textContent = "...";
    span.className = "dots";
    return span;
  };

  if (state.currentPage > 1) {
    paginationContainer.appendChild(
      createButton("<", state.currentPage - 1)
    );
  }

  const pages = new Set([
    1,
    state.currentPage - 1,
    state.currentPage,
    state.currentPage + 1,
    totalPages
  ]);

  [...pages]
    .filter(p => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)
    .forEach((page, index, arr) => {
      if (index > 0 && page - arr[index - 1] > 1) {
        paginationContainer.appendChild(createDots());
      }
      paginationContainer.appendChild(createButton(page, page));
    });

  if (state.currentPage < totalPages) {
    paginationContainer.appendChild(
      createButton(">", state.currentPage + 1)
    );
  }
}
