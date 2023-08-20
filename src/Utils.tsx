import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

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

export const getTimeLeft = (submissionDate: Date) => {
  const now = new Date();
  const totalHoursLeft = differenceInHours(submissionDate, now);
  const daysLeft = differenceInDays(submissionDate, now);
  const hoursLeft = totalHoursLeft % 24;
  const minutesLeft = differenceInMinutes(submissionDate, now) % 60;

  return `${daysLeft} days ${hoursLeft} hours and ${minutesLeft} minutes left`;
}
