import { Student } from "../student";
import { TestCategory } from "../test-category";

export interface Test {
  id: string;
  grade: number;
  score: string;
  student: Student;
  studentId: string;
  category: TestCategory;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
