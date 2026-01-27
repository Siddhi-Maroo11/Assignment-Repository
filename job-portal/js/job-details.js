import { applyForJob } from "./apply.js";

let currentJob = null;

const jobTitleElement = document.getElementById("jobTitle");
const jobCompanyElement = document.getElementById("jobCompany");
const jobLocationElement = document.getElementById("jobLocation");
const jobTypeElement = document.getElementById("jobType");
const jobExperienceElement = document.getElementById("jobExperience");
const jobDescriptionElement = document.getElementById("jobDescription");
const responsibilitiesList = document.getElementById("jobResponsibilities");
const skillsList = document.getElementById("jobSkills");
const closeButton = document.getElementById("closeJob");

const applyBtn = document.getElementById("applyBtn");
const uploadModal = document.getElementById("uploadModal");
const uploadBtn = document.getElementById("uploadBtn");
const cancelBtn = document.getElementById("cancelBtn");

const hiddenInput = document.createElement("input");
hiddenInput.type = "file";
hiddenInput.accept = ".pdf,.doc,.docx";

const urlParams = new URLSearchParams(window.location.search);
const jobId = Number(urlParams.get("id"));

fetch("data/jobs.json")
  .then(response => response.json())
  .then(jobs => {
    const selectedJob = jobs.find(job => job.id === jobId);
    if (!selectedJob) {
      jobTitleElement.textContent = "Job not found";
      return;
    }
    currentJob = selectedJob;

    jobTitleElement.textContent = selectedJob.title;
    jobCompanyElement.textContent = selectedJob.company;
    jobLocationElement.textContent = Array.isArray(selectedJob.location) ? selectedJob.location.join(", ") : selectedJob.location;
    jobTypeElement.textContent = selectedJob.type;
    jobExperienceElement.textContent = selectedJob.experience;
    jobDescriptionElement.textContent = selectedJob.description;

    selectedJob.responsibilities.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      responsibilitiesList.appendChild(li);
    });

    selectedJob.skills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });
  });

closeButton.addEventListener("click", () => {
  window.history.back();
});

applyBtn.addEventListener("click", () => {
  if (!currentJob) return;
  uploadModal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  uploadModal.style.display = "none";
});

uploadBtn.addEventListener("click", () => {
  hiddenInput.click();
});

hiddenInput.addEventListener("change", () => {
  if (!hiddenInput.files.length) return;
  applyForJob(currentJob);
  alert("Resume uploaded successfully ✅");
  uploadModal.style.display = "none";
});
