import { handleRestrictedAction } from "./accessControl.js";
import { applyForJob } from "./apply.js";
import { getAppliedJobs } from "./storage.js";
import { getLoggedInUser } from "./auth/sessionService.js";
import { getUsers } from "./auth/userManager.js";

document.addEventListener("DOMContentLoaded", () => {
  let currentJob = null;

  const jobTitleElement = document.getElementById("jobTitle");
  const jobLocationElement = document.getElementById("jobLocation");
  const jobExperienceElement = document.getElementById("jobExperience");
  const jobDescriptionElement = document.getElementById("jobDescription");
  const responsibilitiesListElement = document.getElementById("jobResponsibilities");
  const skillsListElement = document.getElementById("jobSkills");

  const closeButton = document.getElementById("closeJob");
  const applyButton = document.getElementById("applyBtn");

  const uploadModal = document.getElementById("uploadModal");
  const uploadButton = document.getElementById("uploadBtn");
  const cancelUploadButton = document.getElementById("cancelBtn");

  const resumeFileInput = document.createElement("input");
  resumeFileInput.type = "file";

  const urlParams = new URLSearchParams(window.location.search);
  const jobId = Number(urlParams.get("id"));

  function markJobAsApplied() {
    applyButton.textContent = "Applied";
    applyButton.classList.add("applied-btn");
    applyButton.dataset.applied = "true";
  }

  function hasUserAlreadyApplied(jobId) {
    return getAppliedJobs().some(appliedJob => appliedJob.id === jobId);
  }

  fetch("data/jobs.json")
    .then(response => response.json())
    .then(jobs => {
      const selectedJob = jobs.find(job => job.id === jobId);
      if (!selectedJob) return;

      currentJob = selectedJob;

      jobTitleElement.textContent = selectedJob.title;
      jobLocationElement.textContent = selectedJob.location;
      jobExperienceElement.textContent = selectedJob.experience;
      jobDescriptionElement.textContent = selectedJob.description;

      responsibilitiesListElement.innerHTML = "";
      selectedJob.responsibilities.forEach(responsibility => {
        const listItem = document.createElement("li");
        listItem.textContent = responsibility;
        responsibilitiesListElement.appendChild(listItem);
      });

      skillsListElement.innerHTML = "";
      selectedJob.skills.forEach(skill => {
        const listItem = document.createElement("li");
        listItem.textContent = skill;
        skillsListElement.appendChild(listItem);
      });

      if (hasUserAlreadyApplied(selectedJob.id)) {
        markJobAsApplied();
      }
    });

  closeButton.addEventListener("click", () => {
    window.history.back();
  });

  function checkApplyPermission() {
    const loggedInUserEmail = getLoggedInUser();

    if (!loggedInUserEmail) {
      return { allowed: false, message: "Please login to continue." };
    }

    const loggedInUser = getUsers().find(
      user => user.email === loggedInUserEmail
    );

    if (!loggedInUser || !loggedInUser.isVerified) {
      return {
        allowed: false,
        message: "Please verify your email to apply for jobs."
      };
    }

    return { allowed: true };
  }

  applyButton.addEventListener("click", () => {
    const permissionResult = checkApplyPermission();

    if (!permissionResult.allowed) {
      handleRestrictedAction(permissionResult.message);
      return;
    }

    if (applyButton.dataset.applied === "true") {
      alert("You already applied for this job");
      return;
    }

    uploadModal.classList.remove("hidden");
  });

  cancelUploadButton.addEventListener("click", () => {
    uploadModal.classList.add("hidden");
  });

  uploadButton.addEventListener("click", () => {
    resumeFileInput.value = "";
    resumeFileInput.click();
  });

  resumeFileInput.addEventListener("change", () => {
    try {
      if (!resumeFileInput.files.length) {
        throw new Error("No file selected");
      }

      const selectedFile = resumeFileInput.files[0];
      const allowedFileTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];

      if (!allowedFileTypes.includes(selectedFile.type)) {
        throw new Error("Invalid file type");
      }

      const applicationCompleted = applyForJob(currentJob);

      if (applicationCompleted) {
        alert("Resume uploaded successfully");
        markJobAsApplied();
      }

      uploadModal.classList.add("hidden");
    } catch (error) {
      alert(error.message);
    }
  });
});
