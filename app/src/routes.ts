export const routesTree = {
  home: "/",
  student: {
    root: "students",
    add: "students/add",
    edit: "students/:sid/general",
  },
};

export const resolveRoute = (path: string, id: string): string => {
  return path.replace(":sid", id);
};
