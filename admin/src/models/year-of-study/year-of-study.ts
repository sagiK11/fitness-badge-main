import { Classroom } from "../classroom";
import { Student } from "../student";
import { Teacher } from "../teacher";

export interface YearOfStudy {
  id: string;
  yearName: string;
  startDate: Date;
  endDate: Date;
  teachers: Teacher[];
  students: Student[];
  classrooms: Classroom[];
  createdAt: string;
  updatedAt: string;
}
