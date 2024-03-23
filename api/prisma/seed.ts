import {
  Admin,
  Gender,
  PrismaClient,
  TestCategory,
  YearOfStudy,
} from '@prisma/client';
import { parse } from 'csv-parse/sync';

type AdminSeed = {
  email: Admin['email'];
  firstName: Admin['firstName'];
  lastName: Admin['lastName'];
};
const admins: AdminSeed[] = [
  { email: 'sagi1193@gmail.com', firstName: 'Sagi', lastName: 'Korzack' },
];
type TeacherSeed = {
  email: Admin['email'];
  firstName: Admin['firstName'];
  lastName: Admin['lastName'];
};
const teachers: TeacherSeed[] = [
  { email: 'sagi1193@gmail.com', firstName: 'שגיא', lastName: 'קורזק' },
];

type SchoolSeed = {
  name: string;
  classrooms: { name: string; gender: Gender; count: number }[];
};
const schools: SchoolSeed[] = [
  {
    name: 'תיכון מקיף בית ירח',
    classrooms: [
      { name: 'ט', gender: 'MALE', count: 10 },
      { name: 'ט', gender: 'FEMALE', count: 10 },
      { name: 'י', gender: 'MALE', count: 10 },
      { name: 'י', gender: 'FEMALE', count: 10 },
      { name: 'יא', gender: 'MALE', count: 10 },
      { name: 'יא', gender: 'FEMALE', count: 10 },
      { name: 'יב', gender: 'MALE', count: 10 },
      { name: 'יב', gender: 'FEMALE', count: 10 },
    ],
  },
  {
    name: 'תיכון מקיף בית שמש',
    classrooms: [
      { name: 'ט', gender: 'MALE', count: 2 },
      { name: 'ט', gender: 'FEMALE', count: 2 },
      { name: 'י', gender: 'MALE', count: 2 },
      { name: 'י', gender: 'FEMALE', count: 2 },
      { name: 'יא', gender: 'MALE', count: 2 },
      { name: 'יא', gender: 'FEMALE', count: 2 },
      { name: 'יב', gender: 'MALE', count: 2 },
      { name: 'יב', gender: 'FEMALE', count: 2 },
    ],
  },
];

type YearOfStudiesSeed = {
  yearName: YearOfStudy['yearName'];
  startDate: YearOfStudy['startDate'];
  endDate: YearOfStudy['endDate'];
};
const yearsOfStudy: YearOfStudiesSeed[] = [
  {
    yearName: '2023-2024',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-06-20'),
  },
  {
    yearName: '2024-2025',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2025-06-20'),
  },
  {
    yearName: '2025-2026',
    startDate: new Date('2025-09-01'),
    endDate: new Date('2026-06-20'),
  },
  {
    yearName: '2026-2027',
    startDate: new Date('2026-09-01'),
    endDate: new Date('2027-06-20'),
  },
  {
    yearName: '2027-2028',
    startDate: new Date('2027-09-01'),
    endDate: new Date('2028-06-20'),
  },
  {
    yearName: '2028-2029',
    startDate: new Date('2028-09-01'),
    endDate: new Date('2029-06-20'),
  },
  {
    yearName: '2029-2030',
    startDate: new Date('2029-09-01'),
    endDate: new Date('2030-06-20'),
  },
  {
    yearName: '2030-2031',
    startDate: new Date('2030-09-01'),
    endDate: new Date('2031-06-20'),
  },
  {
    yearName: '2031-2032',
    startDate: new Date('2031-09-01'),
    endDate: new Date('2032-06-20'),
  },
  {
    yearName: '2032-2033',
    startDate: new Date('2032-09-01'),
    endDate: new Date('2033-06-20'),
  },
];

type CategoriesSeed = {
  name: TestCategory['name'];
  measureUnit: TestCategory['measureUnit'];
  alias: TestCategory['alias'];
  algoOperator: TestCategory['algoOperator'];
  fileName: string;
};
const categories: CategoriesSeed[] = [
  {
    name: 'אירובי',
    measureUnit: 'MINUTES',
    alias: 'aerobic',
    algoOperator: 'gte',
    fileName: 'aerobic_grades',
  },
  {
    name: 'קוביות זריזות',
    measureUnit: 'SECONDS',
    alias: 'cubes-quickness',
    algoOperator: 'gte',
    fileName: 'cubes_grades',
  },
  {
    name: 'עליות מתח',
    measureUnit: 'AMOUNT',
    alias: 'pull-up',
    algoOperator: 'lte',
    fileName: 'pull_up_grades',
  },
  {
    name: 'תליית און',
    measureUnit: 'MINUTES',
    alias: 'pull-up-hanging',
    algoOperator: 'lte',
    fileName: 'pull_up_hanging_grades',
  },
  {
    name: 'קפיצה לרוחק',
    measureUnit: 'CENTIMETERS',
    alias: 'distance-jumping',
    algoOperator: 'lte',
    fileName: 'distance_jumping_grades',
  },
  {
    name: 'כפיפות בטן',
    measureUnit: 'AMOUNT',
    alias: 'abs',
    algoOperator: 'lte',
    fileName: 'abs_push_up_full_grades',
  },
  {
    name: 'כפיפות מרפקים',
    measureUnit: 'AMOUNT',
    alias: 'push-up',
    algoOperator: 'lte',
    fileName: 'push_up_full_grades',
  },
  {
    name: 'כפיפות מרפקים חצי',
    measureUnit: 'AMOUNT',
    alias: 'push-up-half',
    algoOperator: 'lte',
    fileName: 'push_up_half_grades',
  },
  {
    name: 'פלאנק',
    measureUnit: 'MINUTES',
    alias: 'plank',
    algoOperator: 'lte',
    fileName: 'plank_grades',
  },
  {
    name: 'אירובי הליכה',
    measureUnit: 'MINUTES',
    alias: 'aerobic-walking',
    algoOperator: 'gte',
    fileName: 'aerobic_walking_grades',
  },
];

const prisma = new PrismaClient();
async function main() {
  // Seed admins
  for (const admin of admins) {
    await prisma.admin.create({
      data: {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      },
    });
  }

  // Seed schools
  for (const schoolData of schools) {
    const school = await prisma.school.create({
      data: { name: schoolData.name },
    });

    for (const classroom of schoolData.classrooms) {
      for (let i = 1; i <= classroom.count + 1; ++i) {
        await prisma.classroom.create({
          data: {
            name: `${classroom.name}-${i}`,
            gender: classroom.gender,
            school: {
              connect: { id: school.id },
            },
          },
        });
      }
    }
  }

  // Seed years of study
  for (const yearOfStudy of yearsOfStudy) {
    await prisma.yearOfStudy.create({
      data: yearOfStudy,
    });
  }

  // Seed test categories
  const fs = await import('fs');
  for (const category of categories) {
    const testCategory = await prisma.testCategory.create({
      data: {
        name: category.name,
        measureUnit: category.measureUnit,
        alias: category.alias,
        algoOperator: category.algoOperator,
      },
    });

    let path = `/prisma/grades/`;
    if (process.env.NODE_ENV === 'development') {
      path = `/usr/src/app${path}`;
    }
    const file = await fs.promises.readFile(`${path}${category.fileName}.csv`);
    const records = parse(file, {
      columns: true,
      skip_empty_lines: true,
    });
    const cleaned = records?.map((entry: any) => {
      return {
        testCategoryId: testCategory.id,
        maleScore: Number(entry.maleScore),
        maleGrade: Number(entry.maleGrade),
        femaleScore: Number(entry.femaleScore),
        femaleGrade: Number(entry.femaleGrade),
      };
    });

    await prisma.categoryScoreResult.createMany({
      data: cleaned,
    });
  }

  const school = await prisma.school.findUnique({
    where: { name: schools?.[0].name },
  });

  if (school) {
    for (const teacher of teachers) {
      await prisma.teacher.create({
        data: {
          email: teacher.email,
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          schoolId: school.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
