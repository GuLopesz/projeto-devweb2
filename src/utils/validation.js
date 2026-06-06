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

  export function validatePhone(phone) {
  const numbers = phone.replace(/\D/g, "");

  return numbers.length === 11;
}

export function validateBirthDate(birthDate) {
  return birthDate !== "";
}

export function validateExperienceLevel(experienceLevel) {
  return experienceLevel !== "";
}