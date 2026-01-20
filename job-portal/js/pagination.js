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

  function createPageButton(pageNumber) {
    const button = document.createElement("button");
    button.textContent = pageNumber;

    if (pageNumber === state.currentPage) {
      button.classList.add("active");
    }

    button.onclick = () => {
      state.currentPage = pageNumber;
      renderJobs();
    };

    return button;
  }

  function createDots() {
    const dots = document.createElement("span");
    dots.textContent = "...";
    dots.className = "dots";
    return dots;
  }

  const pagesToShow = new Set([
    1,
    totalPages,
    state.currentPage,
    state.currentPage - 1,
    state.currentPage + 1
  ]);

  const sortedPages = [...pagesToShow]
    .filter(p => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  let lastPage = 0;

  sortedPages.forEach(page => {
    if (page - lastPage > 1) {
      paginationContainer.appendChild(createDots());
    }
    paginationContainer.appendChild(createPageButton(page));
    lastPage = page;
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.disabled = state.currentPage === totalPages;
  nextButton.onclick = () => {
    state.currentPage++;
    renderJobs();
  };
  paginationContainer.appendChild(nextButton);
}
