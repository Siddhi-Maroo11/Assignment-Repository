import { resetPassword, getUsers } from "../auth/userManager.js";
const emailInput = document.getElementById("emailInput");
const newPassInput = document.getElementById("newPasswordInput");
const confirmPassInput = document.getElementById("confirmPasswordInput");
const resetBtn = document.getElementById("resetBtn");
const error = document.getElementById("error");
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
resetBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const newPassword = newPassInput.value;
    const confirmPass = confirmPassInput.value;
    if (!isValidEmail(email)) {
        error.textContent = "Enter a valid registered email";
        return;
    }
    if (newPassword.length < 6) {
        error.textContent = "Password must be at least 6 characters";
        return;
    }
    if (newPassword !== confirmPass) {
        error.textContent = "Passwords do not match";
        return;
    }
    const users = getUsers();
    const userExists = users.some(user => user.email === email);
    if (!userExists) {
        error.textContent = "Email not registered";
        return;
    }
    await resetPassword(email, newPassword);
    alert("Password reset successful. Please login again.");
    window.location.href = "login.html";
});
