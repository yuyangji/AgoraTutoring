import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

export const percentToGrade = (percent: number) => {
  if (percent >= 85) return "HD";
  if (percent >= 75) return "D";
  if (percent >= 65) return "C";
  if (percent >= 50) return "P";
  return "F";
};

//Date Utils
export const ConvertDate = (date: Date): string => {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const DateToTime = (date: Date): string => {
  return date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateToDDMMYY = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year

  return `${day}-${month}-${year}`;
};

// Example usage:
const date = new Date();
console.log(formatDateToDDMMYY(date)); // Outputs the date in DD-MM-YY format

export const getTimeLeft = (submissionDate: Date) => {
  const now = new Date();
  const totalHoursLeft = differenceInHours(submissionDate, now);
  const daysLeft = differenceInDays(submissionDate, now);
  const hoursLeft = totalHoursLeft % 24;
  const minutesLeft = differenceInMinutes(submissionDate, now) % 60;

  return `${daysLeft} days ${hoursLeft} hours and ${minutesLeft} minutes left`;
};
