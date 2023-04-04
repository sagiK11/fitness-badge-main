interface DynamicValues {
  classroomId?: string;
  studentId?: string;
  yearOfStudyId?: string;
}

export function routesTree({
  yearOfStudyId,
  classroomId,
  studentId,
}: DynamicValues = {}) {
  const tree = {
    home: "/",
    auth: "/auth",
    registration: "/registration",
    classroomDetails: `/years-of-study/${yearOfStudyId}/classrooms/${classroomId}`,
    studentDetails: `/years-of-study/${yearOfStudyId}/classrooms/${classroomId}}/students/${studentId}`,
  };
  return tree;
}
