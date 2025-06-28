export function getRandomNumber(min, max) {
  if (min > max) {
    throw new Error("Min value cannot be greater than Max value.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const formatJoinDate = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  const date = new Date(parseInt(timestamp));

  const options = {
    year: "numeric",
    month: "short",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return `Joined ${formattedDate}`;
};
