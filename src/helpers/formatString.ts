export function formatPhone(phoneNumber: string): string {
  const regex: RegExp = /\D/g;
  return phoneNumber.replace(regex, "");
}

export function getInitials(fullName: string): string {
  if (!fullName) return "";
  const names = fullName.split(/[\s_]+/); // используем регулярное выражение для разбиения строки по пробелам или подчеркиваниям
  if (names.length > 2) {
    const initials = names[0].charAt(0) + names[names.length - 2]?.charAt(0);
    return initials.toUpperCase();
  }
  if (names.length <= 2) {
    const initials = names[0].charAt(0) + names[names.length - 1]?.charAt(0);
    return initials.toUpperCase();
  }
  return "";
}
