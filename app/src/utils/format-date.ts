export function formatDate(date: string) {
  return Intl.DateTimeFormat("en-GB").format(new Date(date));
}
