import { applyForJob } from "./apply.js";
import { getAppliedJobs } from "./storage.js";

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
// hiddenInput.accept = ".pdf,.doc,.docx";

const urlParams = new URLSearchParams(window.location.search);
const jobId = Number(urlParams.get("id"));

function markAsApplied() {
  applyBtn.textContent = "Applied";
  applyBtn.disabled = true;
  applyBtn.classList.add("applied-btn");
}

function isAlreadyApplied(jobId) {
  const appliedJobs = getAppliedJobs();
  return appliedJobs.some(appliedJob => appliedJob.id === jobId);
}

fetch("data/jobs.json")
  .then(response => response.json())
  .then(jobs => {
    const selectedJob = jobs.find(job => job.id === jobId);

    if (!selectedJob) {
      alert("Unable to load job details");
      return;
    }

    currentJob = selectedJob;

    jobTitleElement.textContent = selectedJob.title;
    jobCompanyElement.textContent = selectedJob.company;
    jobLocationElement.textContent = Array.isArray(selectedJob.location)
      ? selectedJob.location.join(", ")
      : selectedJob.location;
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

    if (isAlreadyApplied(selectedJob.id)) {
      markAsApplied();
    }

 })
  .catch(() => {
    alert("Unable to load job details");
  });

closeButton.addEventListener("click", () => {
  window.history.back();
});

applyBtn.addEventListener("click", () => {
  if (!currentJob) {
    alert("Invalid job data");
    return;
  }

  if (isAlreadyApplied(currentJob.id)) {
    alert("You already applied for this job");
    return;
  }

  uploadModal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  uploadModal.style.display = "none";
  alert("Resume upload cancelled");
});

uploadBtn.addEventListener("click", () => {
  hiddenInput.value = "";
  hiddenInput.click();
});

// hiddenInput.addEventListener("change", () => {
//   if (!hiddenInput.files.length) {
//     alert("Unable to upload resume");
//     return;
//   }

//   const appliedSuccessfully = applyForJob(currentJob);

//   if (appliedSuccessfully) {
//     alert("Resume uploaded successfully ✅");
//     markAsApplied();
//   } else {
//     alert("Unable to upload resume");
//   }

//   uploadModal.style.display = "none";
// });

hiddenInput.addEventListener("change", () => {
  try {
    if (!hiddenInput.files.length) throw new Error("No file selected");

    const file = hiddenInput.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type! Please upload PDF or DOC/DOCX only.");
    }

    const appliedSuccessfully = applyForJob(currentJob);

    if (appliedSuccessfully) {
      alert("Resume uploaded successfully ✅");
      markAsApplied();
    } else {
      alert("Unable to upload resume");
    }

    uploadModal.style.display = "none";

  } catch (error) {
    alert(error.message);
  }
});


