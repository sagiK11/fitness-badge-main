export function formatName<T extends { firstName: string; lastName: string }>(
  person: T
) {
  return `${person.firstName} ${person.lastName}`;
}
