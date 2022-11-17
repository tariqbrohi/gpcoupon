// date format : "yyyy-mm-dd"

export default function convertDateToMs(date: string) {
  const newDate = new Date(date);
  const timestampInMs = newDate.getTime();
  return timestampInMs;
}