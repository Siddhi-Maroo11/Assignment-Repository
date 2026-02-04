import { registerUser } from "../auth/userManager.js";
import { setLoginSession } from "../auth/sessionService.js";
import { isValidEmail, isValidPassword } from "../auth/validation.js";

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
const registerBtn = document.getElementById("registerBtn")!;
const errorEl = document.getElementById("error")!;

function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

registerBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!isValidName(name)) {
    errorEl.textContent = "Name must be at least 2 letters.";
    return;
  }
  if (!isValidEmail(email)) {
    errorEl.textContent = "Enter a valid email address.";
    return;
  }
  if (!isValidPassword(password)) {
    errorEl.textContent = "Password must be at least 6 characters.";
    return;
  }

  try {
    await registerUser(name, email, password);
    setLoginSession(email);

    alert("Registered successfully! OTP sent to your email. Please verify.");
    window.location.href = `verify-otp.html?email=${email}`;
  } catch (error: any) {
    errorEl.textContent = error.message;
  }
});
