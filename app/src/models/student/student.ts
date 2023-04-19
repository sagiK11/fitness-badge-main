import { Classroom } from "../classroom";
import { GenderEnum } from "../enums";
import { School } from "../school";
import { Test } from "../test";
import { YearOfStudy } from "../year-of-study";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender: GenderEnum;
  tests: Test[];
  school: School;
  schoolId: string;
  classrooms: Classroom[];
  yearsOfStudy: YearOfStudy[];
  createdAt: string;
  updatedAt: string;
}
