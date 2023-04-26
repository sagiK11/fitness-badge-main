import { Classroom } from "../classroom";
import { Student, StudentEnrollment } from "../student";
import { Teacher, TeacherEnrollment } from "../teacher";

export interface YearOfStudy {
  id: string;
  yearName: string;
  startDate: Date;
  endDate: Date;
  teachers: Teacher[];
  students: Student[];
  teacherEnrollments: TeacherEnrollment[];
  studentEnrollments: StudentEnrollment[];
  createdAt: string;
  updatedAt: string;
}
