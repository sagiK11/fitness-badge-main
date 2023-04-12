interface DynamicValues {}

export function routesTree({}: DynamicValues = {}) {
  const tree = {
    auth: "/auth",
    home: `/`,
  };
  return tree;
}
