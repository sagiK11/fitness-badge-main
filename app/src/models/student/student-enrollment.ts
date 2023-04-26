import { Classroom } from "../classroom";
import { YearOfStudy } from "../year-of-study";
import { Student } from "./student";

export interface StudentEnrollment {
  id: string;
  yearOfStudyId: string;
  yearOfStudy: YearOfStudy;
  classroomId: string;
  classroom: Classroom;
  student: Student;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}
