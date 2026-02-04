import { getUsers, loginUser } from "../auth/userManager.js";
import { setLoginSession } from "../auth/sessionService.js";
import { isValidEmail, isValidPassword } from "../auth/validation.js";
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const errorElement = document.getElementById("error");
const registerLink = document.getElementById("registerLink");
const forgotBtn = document.getElementById("forgotPasswordBtn");
forgotBtn.classList.add("hidden");
loginBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    errorElement.textContent = "";
    forgotBtn.classList.add("hidden");
    if (!isValidEmail(email)) {
        errorElement.textContent = "Please enter a valid email address.";
        return;
    }
    if (!isValidPassword(password)) {
        errorElement.textContent = "Password must be at least 6 characters.";
        return;
    }
    try {
        const users = getUsers();
        const user = users.find(user => user.email === email);
        if (!user) {
            errorElement.textContent = "Email not found. Please register first.";
            return;
        }
        if (!user.isVerified) {
            errorElement.textContent = "Your email is not verified. Please verify OTP.";
            window.location.href = `verify-otp.html?email=${email}`;
            return;
        }
        await loginUser(email, password);
        setLoginSession(email);
        localStorage.setItem("rememberedUser", email);
        window.location.href = "index.html";
    }
    catch (error) {
        switch (error.message) {
            case "WRONG_PASSWORD":
                errorElement.textContent = "Incorrect password.";
                break;
            case "ACCOUNT_LOCKED":
                errorElement.textContent =
                    "Too many invalid attempts. Please reset your password.";
                forgotBtn.classList.remove("hidden");
                break;
            case "EMAIL_NOT_FOUND":
                errorElement.textContent = "Email not found. Please register first.";
                break;
            default:
                errorElement.textContent = "Something went wrong. Please try again.";
        }
    }
});
registerLink.addEventListener("click", () => {
    window.location.href = "register.html";
});
forgotBtn.addEventListener("click", () => {
    window.location.href = "forgotPassword.html";
});
