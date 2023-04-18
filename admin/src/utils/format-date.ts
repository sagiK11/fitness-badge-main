interface FormatDateOptions {
  fallback?: string;
}

export function formatDate(date?: string, options: FormatDateOptions = {}) {
  const { fallback = "-" } = options;
  if (!date) return fallback;
  return Intl.DateTimeFormat("en-GB").format(new Date(date));
}
