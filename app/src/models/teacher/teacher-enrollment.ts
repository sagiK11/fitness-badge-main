import { Classroom } from "../classroom";
import { YearOfStudy } from "../year-of-study";

export interface TeacherEnrollment {
  id: string;
  yearOfStudyId: string;
  yearOfStudy: YearOfStudy;
  classroomId: string;
  classroom: Classroom;
  createdAt: string;
  updatedAt: string;
}
