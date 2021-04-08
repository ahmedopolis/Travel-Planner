// Function to check if dates are valid
function checkOrderDate(today, date1, date2) {
  const currentDate = new Date(today);
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  if (newDate1 < currentDate || newDate2 < currentDate) {
    alert(
      "The entry dates are dated before the current date, or the start date is set later than the end date."
    );
    return false;
  } else {
    return true;
  }
}

export { checkOrderDate };
