import { GenderEnum } from "../enums";
import { Student } from "../student/student";
import { Teacher } from "../teacher";
import { YearOfStudy } from "../year-of-study";

export interface Classroom {
  id: string;
  name: string;
  gender: GenderEnum;
  teacher: Teacher[];
  students: Student[];
  yearsOfStudy: YearOfStudy[];
  createdAt: string;
  updatedAt: string;
}
