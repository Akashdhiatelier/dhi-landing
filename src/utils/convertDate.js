function convertToCustomFormat(isoString) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const date = new Date(isoString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Function to add ordinal suffix to the day
  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const formattedDate = `${getOrdinalSuffix(day)} ${month}, ${year}`;
  return formattedDate;
}

export default convertToCustomFormat;

// Example usage
// const isoDateString = "2023-01-16T07:08:31";
// const customFormattedDate = convertToCustomFormat(isoDateString);
// console.log(customFormattedDate); // Output: 16th JAN, 2023
