type Test = {
  id: string | number;
  category: string;
  grade: string;
  score: string;
  measureUnit: string;
};

export type Student = {
  id: string | number;
  firstName: string;
  lastName: string;
  gender: string;
  studentClass: string;
  phone: string;
  tests: Test[];
};
