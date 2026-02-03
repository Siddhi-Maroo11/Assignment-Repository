import { verifyUserOTP, getUsers } from "../auth/userManager.js";
import { generateOTP } from "../auth/otpService.js";
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get("email");
if (!email) {
    window.location.href = "login.html";
}
const otpInput = document.getElementById("otpInput");
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");
const errorElement = document.getElementById("error");
verifyBtn.addEventListener("click", async () => {
    const otp = otpInput.value.trim();
    errorElement.textContent = "";
    if (!otp) {
        errorElement.textContent = "Please enter the OTP.";
        return;
    }
    try {
        await verifyUserOTP(email, otp);
        alert("Email verified successfully! You can now login.");
        window.location.href = "login.html";
    }
    catch (error) {
        switch (error.message) {
            case "OTP_INVALID":
                errorElement.textContent = "Invalid OTP. Please try again.";
                break;
            case "OTP_EXPIRED":
                errorElement.textContent = "OTP expired. Please request a new one.";
                break;
            case "OTP_NOT_FOUND":
                errorElement.textContent = "OTP not found. Please resend OTP.";
                break;
            default:
                errorElement.textContent = "OTP verification failed.";
        }
    }
});
resendBtn.addEventListener("click", () => {
    const users = getUsers();
    const user = users.find(user => user.email === email);
    if (!user)
        return;
    const otp = generateOTP();
    user.otp = otp;
    localStorage.setItem("JOB_PORTAL_USERS", JSON.stringify(users));
    alert(`Your new OTP is: ${otp.code}`);
});
