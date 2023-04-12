import { TestCategory } from "../test-category";

export interface Test {
  id: string;
  grade: number;
  score: string;
  studentId: string;
  category: TestCategory;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
