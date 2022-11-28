export function getCurrentSeason() {
  const now = new Date();
  const month = now.getMonth() + 1;

  if (month > 3 && month < 6) {
    return "Spring 🌸";
  }

  if (month > 6 && month < 9) {
    return "Summer ⛱";
  }

  if (month > 9 && month < 12) {
    return "Autumn 🍁";
  }

  if (month >= 1 && month < 3) {
    return "Winter ❄️";
  }
}
