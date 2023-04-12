import { Student } from "../student";
import { Teacher } from "../teacher";

export interface School {
  id: string;
  name: string;
  teachers: Teacher[];
  students: Student[];
  createdAt: string;
  updatedAt: string;
}
