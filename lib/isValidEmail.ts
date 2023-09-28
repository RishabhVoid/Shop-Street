const isValidEmail = (email: string | null): boolean => {
  if (!email) return false;
  // Regular expression for validating an email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Use the test method of the regex to check if the email matches the pattern
  return emailRegex.test(email);
};

export default isValidEmail;
