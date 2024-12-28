// write a function that takes in a date value and takes the difference from the current date and returns a string with a text like 1 min ago 5 mon ago 1 hour ago 4 hours ago 5 days ago etc

// this function will take a date object and returns a text value idicating how long it has been since the date object was created
export const timeParser = (date: Date): string => {
  // get the current date
  const currentDate = new Date();
  // get the difference between the current date and the date object
  const diff = currentDate.getTime() - date.getTime();
  // get the difference in seconds
  const seconds = diff / 1000;
  // get the difference in minutes
  const minutes = seconds / 60;
  // get the difference in hours
  const hours = minutes / 60;
  // get the difference in days
  const days = hours / 24;
  // get the difference in months
  const months = days / 30;
  // get the difference in years
  const years = months / 12;

  // check if the difference is larger than an year
  if (years === 1) {
    return "1 year ago";
  }
  if (years > 1) {
    return `${Math.floor(years)} year ago`;
  }

  // check if the difference is larger than a month
  if (months === 1 || (days > 9 && days < 31)) {
    return "a month ago";
  }
  if (months > 1) {
    return `${Math.floor(months)} months ago`;
  }

  // check if the difference is larger than a day
  if (days === 1) {
    return "1 day ago";
  }

  if (days > 1) {
    return `${Math.floor(days)} days ago`;
  }

  // check if the difference is larger than an hour
  if (hours === 1) {
    return "1 hour ago";
  }
  if (hours > 1) {
    return `${Math.floor(hours)} hours ago`;
  }

  // check if the difference is larger than a minute
  if (minutes === 1) {
    return "1 min ago";
  }
  if (minutes > 1) {
    return `${Math.floor(minutes)} mins ago`;
  }

  return "1 min ago";
};
