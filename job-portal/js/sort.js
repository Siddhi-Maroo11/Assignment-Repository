export function sortJobs(jobs, sortBy) {
  if (!sortBy) return jobs;

  const sorted = [...jobs];

  if (sortBy === "company") {
    sorted.sort((a, b) =>
      (a.company ?? "").localeCompare(b.company ?? "")
    );
  }

  if (sortBy === "experience") {
    sorted.sort((a, b) =>
      extractMinExperience(a.experience) -
      extractMinExperience(b.experience)
    );
  }

  return sorted;
}

function extractMinExperience(exp) {
  if (!exp) return 0;
  if (exp === "Fresher") return 0;

  const match = exp.match(/\d+/);
  return match ? Number(match[0]) : 0;
}
