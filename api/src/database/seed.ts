import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const school = await prisma.school.create({
    data: {
      name: 'תיכון מקיף בית ירח',
    },
  });

  const _2022_2023 = await prisma.yearOfStudy.create({
    data: {
      yearName: '2022-2023',
      startDate: new Date('2022-09-01'),
      endDate: new Date('2023-06-20'),
    },
  });

  const _2023_2024 = await prisma.yearOfStudy.create({
    data: {
      yearName: '2023-2024',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2024-06-20'),
    },
  });
  const _2024_2025 = await prisma.yearOfStudy.create({
    data: {
      yearName: '2024-2025',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-06-20'),
    },
  });

  const aerobic = await prisma.testCategory.create({
    data: {
      name: 'ריצה אירובית',
      measureUnit: 'MINUTES',
    },
  });

  const cubes = await prisma.testCategory.create({
    data: {
      name: 'כוביות',
      measureUnit: 'SECONDS',
    },
  });

  const categories = await prisma.testCategory.createMany({
    data: [
      {
        name: 'תליית און',
        measureUnit: 'MINUTES',
      },
      {
        name: 'כפיפות בטן',
        measureUnit: 'MINUTES',
      },
      {
        name: 'עליות מתח',
        measureUnit: 'AMOUNT',
      },
      {
        name: 'קפיצה לרוחק',
        measureUnit: 'CENTIMETERS',
      },
    ],
  });

  const alice = await prisma.teacher.create({
    data: {
      email: 'alice@prisma.io',
      firstName: 'אליס',
      lastName: 'אורן',
      school: {
        connect: { id: school.id },
      },
      yearsOfStudy: {
        connect: [
          {
            id: _2022_2023.id,
          },
          {
            id: _2023_2024.id,
          },
          {
            id: _2024_2025.id,
          },
        ],
      },
    },
  });

  const rachel = await prisma.teacher.create({
    data: {
      email: 'rachel@prisma.io',
      firstName: 'רחלי',
      lastName: 'כהן',
      school: {
        connect: { id: school.id },
      },
      yearsOfStudy: {
        connect: [
          {
            id: _2022_2023.id,
          },
          {
            id: _2023_2024.id,
          },
          {
            id: _2024_2025.id,
          },
        ],
      },
    },
  });

  const sagi = await prisma.teacher.create({
    data: {
      email: 'sagi@collectiveliquidity.com',
      firstName: 'שגיא',
      lastName: 'קל',
      school: {
        connect: { id: school.id },
      },
      yearsOfStudy: {
        connect: [
          {
            id: _2022_2023.id,
          },
          {
            id: _2023_2024.id,
          },
          {
            id: _2024_2025.id,
          },
        ],
      },
    },
  });

  const a1 = await prisma.classroom.create({
    data: {
      name: 'ט-1',
      gender: 'MALE',
      school: {
        connect: { id: school.id },
      },
      teacher: {
        connect: [
          {
            id: alice.id,
          },
          {
            id: sagi.id,
          },
        ],
      },
      yearsOfStudy: {
        connect: {
          id: _2022_2023.id,
        },
      },
    },
  });

  const a2 = await prisma.classroom.create({
    data: {
      name: 'ט-2',
      gender: 'MALE',
      school: {
        connect: { id: school.id },
      },
      teacher: {
        connect: [
          {
            id: alice.id,
          },
          {
            id: sagi.id,
          },
        ],
      },
      yearsOfStudy: {
        connect: {
          id: _2022_2023.id,
        },
      },
    },
  });

  const a3 = await prisma.classroom.create({
    data: {
      name: 'ט-3',
      gender: 'FEMALE',
      school: {
        connect: { id: school.id },
      },
      yearsOfStudy: {
        connect: {
          id: _2022_2023.id,
        },
      },
    },
  });

  const a4 = await prisma.classroom.create({
    data: {
      name: 'ט-4',
      gender: 'FEMALE',
      school: {
        connect: { id: school.id },
      },
      yearsOfStudy: {
        connect: {
          id: _2022_2023.id,
        },
      },
    },
  });

  const a5 = await prisma.classroom.create({
    data: {
      name: '5-ט',
      gender: 'FEMALE',
      school: {
        connect: { id: school.id },
      },
      yearsOfStudy: {
        connect: {
          id: _2022_2023.id,
        },
      },
    },
  });

  const ben = await prisma.student.create({
    data: {
      firstName: 'Ben',
      lastName: 'Fol',
      school: {
        connect: {
          id: school.id,
        },
      },
      yearsOfStudy: {
        connect: {
          id: _2022_2023.id,
        },
      },
      classrooms: {
        connect: {
          id: a2.id,
        },
      },
      tests: {
        create: [
          {
            category: {
              connect: {
                id: aerobic.id,
              },
            },
            score: '8.4',
            grade: 89,
          },
        ],
      },
    },
  });

  const idan = await prisma.student.create({
    data: {
      firstName: 'Idan',
      lastName: 'Oke',
      school: {
        connect: {
          id: school.id,
        },
      },
      yearsOfStudy: {
        connect: {
          id: _2022_2023.id,
        },
      },
      classrooms: {
        connect: {
          id: a1.id,
        },
      },
      tests: {
        create: [
          {
            category: {
              connect: {
                id: aerobic.id,
              },
            },

            score: '8.4',
            grade: 89,
          },
          {
            category: {
              connect: {
                id: cubes.id,
              },
            },
            score: '8.8',
            grade: 74,
          },
        ],
      },
    },
  });

  console.log({ alice, rachel });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
