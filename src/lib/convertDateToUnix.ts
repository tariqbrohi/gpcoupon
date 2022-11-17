// date format : "yyyy-mm-dd"

export default function convertDateToUnix(date: string) {
  const newDate = new Date(date);
  const unixTimestamp = Math.floor(newDate.getTime() / 1000);
  
  return unixTimestamp;
}