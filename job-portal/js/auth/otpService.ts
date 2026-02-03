const OTP_EXPIRY_MS = 5 * 60 * 1000;

export function generateOTP(): { code: string; expiresAt: number } {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return {
    code,
    expiresAt: Date.now() + OTP_EXPIRY_MS
  };
}

export function validateOTP(
  input: string,
  otp?: { code: string; expiresAt: number }
) {
  if (!otp) {
    throw new Error("OTP_NOT_FOUND");
  }

  if (Date.now() > otp.expiresAt) {
    throw new Error("OTP_EXPIRED");
  }

  if (otp.code !== input) {
    throw new Error("OTP_INVALID");
  }

  return true;
}

