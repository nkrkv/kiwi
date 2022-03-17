export default function Timestamp({ value }) {
  if (!value) {
    return "N/A";
  }

  return new Date(value * 1000).toLocaleString("de-DE");
}
