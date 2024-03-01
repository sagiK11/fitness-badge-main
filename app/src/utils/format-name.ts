export function formatName(person: { firstName: string; lastName: string }) {
  return `${person.firstName} ${person.lastName}`;
}

export function formatNameWithIsraelId(person: {
  firstName: string;
  lastName: string;
  israelId?: string;
}) {
  return `${person.firstName} ${person.lastName} (${person.israelId})`;
}
