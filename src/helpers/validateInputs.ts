export function validateEmail(email: string): "" | "error" {
  if (email === "") return "";
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? "" : "error";
}

export function validatePassword(password: string): "" | "error" {
  if (password === "") return "";
  const regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[a-z])[A-Za-z\d]{8,}$/;
  return regex.test(password) ? "" : "error";
}

export function validateText(values: string): "" | "error" {
  if (values === "") return "";
  const regex: RegExp = /^\d+$/;
  return regex.test(values) ? "error" : "";
}

export function validateRepeatPassword(password: string, repeatPassword: string): "" | "error" {
  if (password === "") return "";
  const regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[a-z])[A-Za-z\d]{8,}$/;
  return regex.test(password) && password === repeatPassword ? "" : "error";
}
