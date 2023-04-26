const getLastTuesday = (_date: Date) => {
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

export default getLastTuesday;
