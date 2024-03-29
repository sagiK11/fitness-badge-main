import { Classroom } from "../classroom";
import { School } from "../school";
import { YearOfStudy } from "../year-of-study";

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  classrooms: Classroom[];
  yearsOfStudy: YearOfStudy[];
  school: School;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}
