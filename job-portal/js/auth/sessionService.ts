import { getUserProfile } from "./userManager.js";

export function setLoginSession(email) {
  sessionStorage.setItem("loggedInUser", email);
}

export function getLoggedInUser() {
  return sessionStorage.getItem("loggedInUser");
}

export function clearLoginSession() {
  sessionStorage.removeItem("loggedInUser");
}

export function getLoggedInUserProfile() {
  const email = getLoggedInUser();
  if (!email) return null;
  return getUserProfile(email);
}
