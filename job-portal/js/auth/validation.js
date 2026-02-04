export function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
}
export function isValidPassword(password) {
    return password.length >= 6;
}
