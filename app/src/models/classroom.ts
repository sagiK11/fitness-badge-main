import { Student } from "./student";

export type Classroom = {
  id: string;
  name: string;
  gender: string;
  students: Student[];
};
