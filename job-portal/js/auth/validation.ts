export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}
