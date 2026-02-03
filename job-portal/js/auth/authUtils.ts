export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  loginAttempts: number;
  roles: Role[];
  otp?: OTPData;
}

export interface OTPData {
  code: string;
  expiresAt: number;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  isVerified: boolean;
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hashBuffer);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const hashed = await hashPassword(password);
  return hashed === hash;
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
