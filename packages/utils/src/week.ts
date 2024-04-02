export const getPreviousTuesday = (_date: Date) => {
  // Create a new date object so we don't mutate the original
  const date = new Date(_date);

  const dayOfWeek = date.getDay();

  // If the date is a Tuesday, return the date
  if (date.getDay() === 2) {
    return date;
  }

  // Subtract the number of days to get to the previous Tuesday
  const daysUntilTuesday = (dayOfWeek + 5) % 7; // 0 for Tuesday, 1 for Monday, etc.
  date.setDate(date.getDate() - daysUntilTuesday);

  return date;
};

export const getDateString = (date: Date) => {
  const year = date.getFullYear();
  let month: string | number = date.getMonth() + 1; // getMonth() is zero-indexed
  let day: string | number = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

export const getPreviousTuesdayString = (date: Date) => {
  const previousTuesday = getPreviousTuesday(date);
  return getDateString(previousTuesday);
};
