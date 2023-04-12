export interface TeacherParams {
  yearOfStudyId: string;
  teacherId: string;
}

export interface ClassroomParams {
  yearOfStudyId: string;
  teacherId: string;
  classroomId: string;
}

export interface StudentParams {
  yearOfStudyId: string;
  classroomId: string;
  studentId: string;
}
