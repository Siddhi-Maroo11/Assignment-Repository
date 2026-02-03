export function sortJobs(jobs, sortBy) {
  if (!sortBy) return jobs;

  const sortedJobs = [...jobs];

  if (sortBy === "company") {
    sortedJobs.sort((firstJob, secondJob) =>
      (firstJob.company ?? "").localeCompare(secondJob.company ?? "")
    );
  }

  if (sortBy === "experience") {
    sortedJobs.sort(
      (firstJob, secondJob) =>
        extractMinExperience(firstJob.experience) -
        extractMinExperience(secondJob.experience)
    );
  }

  return sortedJobs;
}

function extractMinExperience(experienceText) {
  if (!experienceText) return 0;
  if (experienceText === "Fresher") return 0;

  const matchedNumber = experienceText.match(/\d+/);
  return matchedNumber ? Number(matchedNumber[0]) : 0;
}
