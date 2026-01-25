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
    jobLocationElement.textContent = selectedJob.location.join(", ");
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
  window.close();
});

const applyBtn = document.getElementById("applyBtn");

applyBtn.addEventListener("click", () => {
  applyForJob(currentJob);
});
