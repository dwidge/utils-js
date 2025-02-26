export const getTimeDifferenceString = (
  dateSeconds?: number,
  fromSeconds: number = Date.now() / 1000,
): string => {
  if (!dateSeconds) return "";

  const diffInSeconds = Math.round(fromSeconds - dateSeconds);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 60 * 60) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 60 * 60 * 24) {
    const diffInHours = Math.floor(diffInSeconds / (60 * 60));
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else {
    const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }
};
