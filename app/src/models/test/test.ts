import { TestCategory } from "../test-category";

export interface Test {
  id: string;
  grade: number;
  score: number;
  studentId: string;
  category: TestCategory;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
