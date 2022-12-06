import { MainLayout, StudentCard } from "@components";

const data = [
  {
    id: 1,
    firstName: "שגיא",
    lastName: "קורזק",
    studentClass: "י-1",
    gender: "זכר",
    phone: "050-320-1679",
    finalGrade: 85,
    tests: [
      {
        id: 1,
        category: "אירובי",
        grade: "100",
        score: "9.10",
        measureUnit: "דקות",
      },
      {
        id: 2,
        category: "ידיים",
        grade: "85",
        score: "1.1",
        measureUnit: "שניות",
      },
      {
        id: 3,
        category: "כפיפות בטן",
        grade: "85",
        score: "1.1",
        measureUnit: "יחידות",
      },
      {
        id: 4,
        category: "זריזות",
        grade: "75",
        score: "9.10",
        measureUnit: "שניות",
      },
    ],
  },
  {
    id: 2,
    firstName: "אבי",
    lastName: "קורזק",
    studentClass: "י-4",
    gender: "זכר",
    finalGrade: 85,
    tests: [
      {
        id: 1,
        category: "אירובי",
        grade: "100",
        score: "9.10",
        measureUnit: "דקות",
      },
      {
        id: 2,
        category: "ידיים",
        grade: "85",
        score: "1.1",
        measureUnit: "שניות",
      },
      {
        id: 3,
        category: "כפיפות בטן",
        grade: "85",
        score: "1.1",
        measureUnit: "יחידות",
      },
      {
        id: 4,
        category: "זריזות",
        grade: "75",
        score: "9.10",
        measureUnit: "שניות",
      },
    ],
  },
  {
    id: 3,
    firstName: "עידן",
    lastName: "קורזק",
    studentClass: "י-4",
    gender: "זכר",
    finalGrade: 73,
    tests: [
      {
        id: 1,
        category: "אירובי",
        grade: "100",
        score: "9.10",
        measureUnit: "דקות",
      },
      {
        id: 2,
        category: "ידיים",
        grade: "85",
        score: "1.1",
        measureUnit: "שניות",
      },
      {
        id: 3,
        category: "כפיפות בטן",
        grade: "85",
        score: "1.1",
        measureUnit: "יחידות",
      },
      {
        id: 4,
        category: "זריזות",
        grade: "75",
        score: "9.10",
        measureUnit: "שניות",
      },
    ],
  },
  {
    id: 4,
    firstName: "נועם",
    lastName: "קורזק",
    studentClass: "י-4",
    gender: "זכר",
    finalGrade: 73,
    tests: [
      {
        id: 1,
        category: "אירובי",
        grade: "100",
        score: "9.10",
        measureUnit: "דקות",
      },
      {
        id: 2,
        category: "ידיים",
        grade: "85",
        score: "1.1",
        measureUnit: "שניות",
      },
      {
        id: 3,
        category: "כפיפות בטן",
        grade: "85",
        score: "1.1",
        measureUnit: "יחידות",
      },
      {
        id: 4,
        category: "זריזות",
        grade: "75",
        score: "9.10",
        measureUnit: "שניות",
      },
    ],
  },
];

const HomePage = (props) => {
  return (
    <MainLayout>
      {data.map((student) => {
        return <StudentCard key={student.id} {...student} />;
      })}
    </MainLayout>
  );
};

export default HomePage;
