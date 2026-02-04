import { getLoggedInUserProfile, clearLoginSession } from "../auth/sessionService.js";
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
const loggedInSection = document.getElementById("profileLoggedIn");
const loggedOutSection = document.getElementById("profileLoggedOut");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const savedCount = document.getElementById("savedCount");
const appliedCount = document.getElementById("appliedCount");
const loginBtn = document.getElementById("loginFromProfile");
const logoutBtn = document.getElementById("logoutFromProfile");
profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    profileDropdown.classList.toggle("hidden");
    renderProfile();
});
function renderProfile() {
    const user = getLoggedInUserProfile();
    if (!user) {
        loggedInSection.classList.add("hidden");
        loggedOutSection.classList.remove("hidden");
        return;
    }
    loggedOutSection.classList.add("hidden");
    loggedInSection.classList.remove("hidden");
    profileName.textContent = user.name;
    profileEmail.textContent = user.email;
    savedCount.textContent = String(user.savedJobs.length);
    appliedCount.textContent = String(user.appliedJobs.length);
}
loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
});
logoutBtn.addEventListener("click", () => {
    clearLoginSession();
    renderProfile();
});
document.addEventListener("click", (event) => {
    const target = event.target;
    if (!profileBtn.contains(target) && !profileDropdown.contains(target)) {
        profileDropdown.classList.add("hidden");
    }
});
window.addEventListener("storage", () => {
    if (!profileDropdown.classList.contains("hidden")) {
        renderProfile();
    }
});
renderProfile();
