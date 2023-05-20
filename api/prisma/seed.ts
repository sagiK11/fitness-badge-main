import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.admin.create({
    data: {
      firstName: 'Sagi',
      lastName: 'Korzack',
      email: 'sagi1193@gmail.com',
    },
  });

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
      name: 'אירובי',
      measureUnit: 'MINUTES',
      alias: 'aerobic',
      algoOperator: 'gte',
    },
  });

  const cubes = await prisma.testCategory.create({
    data: {
      name: 'כוביות זריזות',
      measureUnit: 'SECONDS',
      alias: 'cubes-quickness',
      algoOperator: 'gte',
    },
  });

  const pull_up = await prisma.testCategory.create({
    data: {
      name: 'עליות מתח',
      measureUnit: 'AMOUNT',
      alias: 'pull-up',
      algoOperator: 'lte',
    },
  });

  const pull_up_hanging = await prisma.testCategory.create({
    data: {
      name: 'תליית און',
      measureUnit: 'MINUTES',
      alias: 'pull-up-hanging',
      algoOperator: 'lte',
    },
  });

  const distance_jumping_grades = await prisma.testCategory.create({
    data: {
      name: 'קפיצה לרוחק',
      measureUnit: 'CENTIMETERS',
      alias: 'distance-jumping',
      algoOperator: 'lte',
    },
  });

  const abs_push_up_full = await prisma.testCategory.create({
    data: {
      name: 'כפיפות בטן',
      measureUnit: 'AMOUNT',
      alias: 'abs',
      algoOperator: 'lte',
    },
  });

  const push_up_full = await prisma.testCategory.create({
    data: {
      name: 'כפיפות מרפקים',
      measureUnit: 'AMOUNT',
      alias: 'push-up',
      algoOperator: 'lte',
    },
  });

  const push_up_half = await prisma.testCategory.create({
    data: {
      name: 'כפיפות מרפקים חצי',
      measureUnit: 'AMOUNT',
      alias: 'push-up-half',
      algoOperator: 'lte',
    },
  });

  const plank = await prisma.testCategory.create({
    data: {
      name: 'פלאנק',
      measureUnit: 'MINUTES',
      alias: 'plank',
      algoOperator: 'lte',
    },
  });

  const aerobic_walking = await prisma.testCategory.create({
    data: {
      name: 'אירובי הליכה',
      measureUnit: 'MINUTES',
      alias: 'aerobic-walking',
      algoOperator: 'gte',
    },
  });

  const a1Male = await prisma.classroom.create({
    data: {
      name: 'ט-1',
      gender: 'MALE',
      school: {
        connect: { id: school.id },
      },
    },
  });

  const a2Male = await prisma.classroom.create({
    data: {
      name: 'ט-2',
      gender: 'MALE',
      school: {
        connect: { id: school.id },
      },
    },
  });

  const a3Female = await prisma.classroom.create({
    data: {
      name: 'ט-3',
      gender: 'FEMALE',
      school: {
        connect: { id: school.id },
      },
    },
  });

  const a4Female = await prisma.classroom.create({
    data: {
      name: 'ט-4',
      gender: 'FEMALE',
      school: {
        connect: { id: school.id },
      },
    },
  });

  const a5Female = await prisma.classroom.create({
    data: {
      name: '5-ט',
      gender: 'FEMALE',
      school: {
        connect: { id: school.id },
      },
    },
  });

  const gradesData = [
    { fileName: 'abs_push_up_full_grades', id: abs_push_up_full.id },
    { fileName: 'aerobic_grades', id: aerobic.id },
    { fileName: 'aerobic_walking_grades', id: aerobic_walking.id },
    { fileName: 'cubes_grades', id: cubes.id },
    { fileName: 'distance_jumping_grades', id: distance_jumping_grades.id },
    { fileName: 'plank_grades', id: plank.id },
    { fileName: 'pull_up_grades', id: pull_up.id },
    { fileName: 'pull_up_hanging_grades', id: pull_up_hanging.id },
    { fileName: 'push_up_full_grades', id: push_up_full.id },
    { fileName: 'push_up_half_grades', id: push_up_half.id },
  ];

  const fs = await import('fs');
  for (const fileData of gradesData) {
    const file = await fs.promises.readFile(
      `/usr/src/app/src/database/grades/${fileData.fileName}.csv`,
    );
    const records = parse(file, {
      columns: true,
      skip_empty_lines: true,
    });
    const cleaned = records?.map((entry) => {
      return {
        testCategoryId: fileData.id,
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

  // const alice = await prisma.teacher.create({
  //   data: {
  //     email: 'alice@prisma.io',
  //     firstName: 'אליס',
  //     lastName: 'אורן',
  //     school: {
  //       connect: { id: school.id },
  //     },
  //     enrollments: {
  //       createMany: {
  //         data: [
  //           { yearOfStudyId: _2022_2023.id, classroomId: a1Male.id },
  //           { yearOfStudyId: _2023_2024.id, classroomId: a1Male.id },
  //           { yearOfStudyId: _2024_2025.id, classroomId: a1Male.id },
  //         ],
  //       },
  //     },
  //   },
  // });

  // const rachel = await prisma.teacher.create({
  //   data: {
  //     email: 'rachel@prisma.io',
  //     firstName: 'רחלי',
  //     lastName: 'כהן',
  //     school: {
  //       connect: { id: school.id },
  //     },
  //     enrollments: {
  //       createMany: {
  //         data: [
  //           { yearOfStudyId: _2022_2023.id, classroomId: a3Female.id },
  //           { yearOfStudyId: _2023_2024.id, classroomId: a3Female.id },
  //           { yearOfStudyId: _2024_2025.id, classroomId: a3Female.id },
  //         ],
  //       },
  //     },
  //   },
  // });

  // const sagi = await prisma.teacher.create({
  //   data: {
  //     email: 'sagi@collectiveliquidity.com',
  //     firstName: 'שגיא',
  //     lastName: 'קל',
  //     school: {
  //       connect: { id: school.id },
  //     },
  //     enrollments: {
  //       createMany: {
  //         data: [
  //           { yearOfStudyId: _2022_2023.id, classroomId: a2Male.id },
  //           { yearOfStudyId: _2023_2024.id, classroomId: a2Male.id },
  //         ],
  //       },
  //     },
  //   },
  // });

  const ben = await prisma.student.create({
    data: {
      firstName: 'בן',
      lastName: 'אורן',
      gender: 'MALE',
      enrollments: {
        createMany: {
          data: [{ classroomId: a2Male.id, yearOfStudyId: _2022_2023.id }],
        },
      },
      school: {
        connect: {
          id: school.id,
        },
      },

      tests: {
        create: [
          {
            classroom: {
              connect: {
                id: a2Male.id,
              },
            },
            yearsOfStudy: {
              connect: {
                id: _2022_2023.id,
              },
            },
            category: {
              connect: {
                id: aerobic.id,
              },
            },
            score: 8.4,
            grade: 89,
          },
        ],
      },
    },
  });

  const galia = await prisma.student.create({
    data: {
      firstName: 'גליה',
      lastName: 'מרון',
      gender: 'FEMALE',
      school: {
        connect: {
          id: school.id,
        },
      },
      enrollments: {
        createMany: {
          data: [{ classroomId: a3Female.id, yearOfStudyId: _2022_2023.id }],
        },
      },
      tests: {
        create: [
          {
            classroom: {
              connect: {
                id: a3Female.id,
              },
            },
            yearsOfStudy: {
              connect: {
                id: _2022_2023.id,
              },
            },
            category: {
              connect: {
                id: aerobic.id,
              },
            },
            score: 8.2,
            grade: 87,
          },
        ],
      },
    },
  });

  const idan = await prisma.student.create({
    data: {
      firstName: 'עידן',
      lastName: 'יובל',
      gender: 'MALE',
      school: {
        connect: {
          id: school.id,
        },
      },
      enrollments: {
        createMany: {
          data: [{ classroomId: a1Male.id, yearOfStudyId: _2022_2023.id }],
        },
      },
      tests: {
        create: [
          {
            classroom: {
              connect: {
                id: a1Male.id,
              },
            },
            yearsOfStudy: {
              connect: {
                id: _2022_2023.id,
              },
            },
            category: {
              connect: {
                id: aerobic.id,
              },
            },

            score: 8.4,
            grade: 89,
          },
          {
            classroom: {
              connect: {
                id: a1Male.id,
              },
            },
            yearsOfStudy: {
              connect: {
                id: _2022_2023.id,
              },
            },
            category: {
              connect: {
                id: cubes.id,
              },
            },
            score: 8.8,
            grade: 74,
          },
        ],
      },
    },
  });

  // console.log({ sagi, rachel });
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
