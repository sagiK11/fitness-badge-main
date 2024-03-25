export const roles = ['teacher', 'admin', 'student'] as const;
export type Role = (typeof roles)[number];
