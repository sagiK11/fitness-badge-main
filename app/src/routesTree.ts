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
    auth: "/auth",
    registration: "/registration",
    home: `/`,
    yearOfStudy: `/years-of-study/${yearOfStudyId}`,
    classroomDetails: `/years-of-study/${yearOfStudyId}/classrooms/${classroomId}`,
    studentDetails: `/years-of-study/${yearOfStudyId}/classrooms/${classroomId}}/students/${studentId}`,
  };
  return tree;
}
