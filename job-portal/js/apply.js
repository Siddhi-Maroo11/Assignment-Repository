import { getAppliedJobs, saveAppliedJobs } from "./storage.js";

export function applyForJob(job) {
  try {
    if (!job?.id) throw new Error("Invalid job data");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";

    input.onchange = () => {
      if (!input.files.length) return;

      const appliedJobs = getAppliedJobs();

      const alreadyApplied = appliedJobs.some(j => j.id === job.id);
      if (alreadyApplied) {
        alert("You have already applied for this job");
        return;
      }

      appliedJobs.push({
        id: job.id,
        title: job.title,
        company: job.company,
        appliedAt: new Date().toISOString()
      });

      saveAppliedJobs(appliedJobs);
      alert("Job applied successfully ✅");
    };

    input.click();
  } catch (error) {
    console.error(error);
    alert("Unable to apply for job");
  }
}
