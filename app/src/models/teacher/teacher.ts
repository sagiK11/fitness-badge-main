import { Classroom } from "../classroom";
import { School } from "../school";
import { YearOfStudy } from "../year-of-study";
import { TeacherEnrollment } from "./teacher-enrollment";

export interface Teacher {
  id: string;
  firstName: String;
  lastName: String;
  email: string;
  enrollments: TeacherEnrollment[];
  school: School;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}
