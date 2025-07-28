export function dbTimeForHuman(str) {
  if (!str) {
    console.error("Invalid date string:", str);
    return ''; // Return an empty string or some fallback value if str is undefined
  }
  
  return str.replace('T', ' ').substring(0, 16);
}
