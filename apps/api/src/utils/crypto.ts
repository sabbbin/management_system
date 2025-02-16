import argon2 from "argon2";

export const decryptedPassword = async (plainPassword: string) => {
  try {
    const hashedPassword = await argon2.hash(plainPassword);
    return hashedPassword;
  } catch (err) {
    console.log(" Error in hashing password");
    return null;
  }
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  try {
    const isPasswordMatch = await argon2.verify(plainPassword, hashedPassword);
    return isPasswordMatch;
  } catch (err) {
    console.log(" Error in hashing password");
    return null;
  }
};
