export const routesTree = {
  home: "/",
  dashboard: "/dashboard",
  classes: "/dashboard/classes",
  updateClass: "/dashboard/classes/:classId",
  students: "/dashboard/classes/:classId/students",
  updateStudent: "/dashboard/classes/:classId/students/:studentId",
  createStudent: "/dashboard/classes/:classId/students/create",
};

export const resolveRoute = (path: string, id: string): string => {
  return path.replace(":studentId", id);
};
