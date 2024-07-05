export const validatePassword = async (password) => {
    const upperCasePattern = /[A-Z]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  
    const hasUpperCase = upperCasePattern.test(password);
    const hasSpecialChar = specialCharPattern.test(password);
    return hasUpperCase && hasSpecialChar;
}

