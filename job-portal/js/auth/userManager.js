import { hashPassword, verifyPassword } from "./authUtils.js";
import { generateOTP, validateOTP } from "./otpService.js";
import { getFromStorage, setToStorage } from "./storageHelper.js";
const USER_PREFIX = "USER_";
const MAX_LOGIN_ATTEMPTS = 3;
function getUserKey(email) {
    return USER_PREFIX + email;
}
export function getUsers() {
    const users = [];
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        if (key.startsWith(USER_PREFIX)) {
            const user = getFromStorage(key);
            if (user)
                users.push(user);
        }
    }
    return users;
}
export function getUserProfile(email) {
    return getFromStorage(getUserKey(email));
}
function saveUser(user) {
    setToStorage(getUserKey(user.email), user);
}
export async function registerUser(name, email, password) {
    if (getUserProfile(email)) {
        throw new Error("Email already registered");
    }
    const passwordHash = await hashPassword(password);
    const otp = generateOTP();
    const user = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash,
        role: "USER",
        isVerified: false,
        loginAttempts: 0,
        otp,
        savedJobs: [],
        appliedJobs: []
    };
    saveUser(user);
    alert(`Your OTP is: ${otp.code}`);
}
export function verifyUserOTP(email, otpInput) {
    const user = getUserProfile(email);
    if (!user || !user.otp)
        throw new Error("OTP_NOT_FOUND");
    validateOTP(otpInput, user.otp);
    user.isVerified = true;
    user.otp = null;
    saveUser(user);
    return true;
}
export async function loginUser(email, password) {
    const user = getUserProfile(email);
    if (!user)
        throw new Error("EMAIL_NOT_FOUND");
    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        throw new Error("ACCOUNT_LOCKED");
    }
    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
        user.loginAttempts += 1;
        saveUser(user);
        if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            throw new Error("ACCOUNT_LOCKED");
        }
        throw new Error("WRONG_PASSWORD");
    }
    user.loginAttempts = 0;
    saveUser(user);
    return true;
}
export async function resetPassword(email, newPassword) {
    const user = getUserProfile(email);
    if (!user)
        throw new Error("Email not registered");
    user.passwordHash = await hashPassword(newPassword);
    user.loginAttempts = 0;
    saveUser(user);
}
