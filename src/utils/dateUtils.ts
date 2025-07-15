export function toReadableDate(isoString: string, locale = "en-SG"): string {
  if (!isoString) return "";

  try {
    const date = new Date(isoString);

    const datePart = date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const weekdayPart = date.toLocaleDateString(locale, {
      weekday: "long",
    });

    return `${datePart} (${weekdayPart})`;
  } catch {
    return "Invalid Date!";
  }
}
