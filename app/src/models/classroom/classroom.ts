import { GenderEnum } from "../enums";
import { StudentEnrollment } from "../student";
import { TeacherEnrollment } from "../teacher";

export interface Classroom {
  id: string;
  name: string;
  gender: GenderEnum;
  studentEnrollments: StudentEnrollment[];
  teacherEnrollments: TeacherEnrollment[];
  createdAt: string;
  updatedAt: string;
}
