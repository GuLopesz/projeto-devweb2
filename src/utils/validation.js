export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return emailPattern.test(email);
  }
  
  export function validatePassword(password) {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
    return passwordPattern.test(password);
  }
  
  export function validateName(name) {
    return name.trim().length >= 3;
  }