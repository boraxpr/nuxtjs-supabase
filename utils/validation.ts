// Function to validate email format
export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswordComplexityValid = (password: string) => {
  // Example: Minimum length of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
  const complexityRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return complexityRegex.test(password);
};
