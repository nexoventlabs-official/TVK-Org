// Validation utilities

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Indian phone number: 10 digits
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned);
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100;
};

export const isValidMessage = (message: string): boolean => {
  return message.trim().length >= 10 && message.trim().length <= 1000;
};

export const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters
  return input.replace(/[<>]/g, '').trim();
};
