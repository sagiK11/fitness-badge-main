interface DynamicValues {
  schoolId?: string;
}

export function routesTree({ schoolId }: DynamicValues = {}) {
  const tree = {
    auth: "/auth",
    home: `/`,
    schoolDetails: `/schools/${schoolId}`,
  };
  return tree;
}
