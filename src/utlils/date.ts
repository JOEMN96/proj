export default function formatDateFromTimestamp(timestamp: string): string {
  // Convert the timestamp to a JavaScript Date object
  const date = new Date(Number(timestamp));

  // Check for an invalid date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid timestamp");
  }

  // Format the date into a readable format
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
