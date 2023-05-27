import { GenderEnum } from "@/models";

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
export interface TestCategoryParams {
  yearOfStudyId: string;
  testCategoryId: string;
  studentId: string;
  classroomId: string;
}

export interface UpdateTestParams {
  id: string;
  score: number;
  gender: GenderEnum;
  categoryId: string;
}

export interface UploadStudentsPayload {
  schoolId: string;
  classroomId: string;
  yearOfStudyId: string;
  data: FormData;
}
