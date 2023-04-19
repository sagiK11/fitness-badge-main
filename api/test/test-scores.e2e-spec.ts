import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestCategoriesModule } from '@src/v1/test-categories/test-categories.module';
import { TestCategoriesService } from '@src/v1/test-categories/test-categories.service';
import { ResultService } from '@src/utils/result/result.service';
import { ExceptionService } from '@src/utils/result/exception.service';
import { PrismaService } from '@src/prisma/prisma.service';

interface TestParams {
  alias: string;
  gender: string;
  score: string;
  result: string;
}

describe('TestCategoriesController (e2e)', () => {
  let app: INestApplication;
  const baseUrl = `/test-categories/score-result`;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestCategoriesModule],
      providers: [
        TestCategoriesService,
        ResultService,
        ExceptionService,
        PrismaService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const testCategory = async (tests: TestParams[]) => {
    for (const test of tests) {
      const { alias, gender, score, result } = test;
      const endpoint = `${baseUrl}?alias=${alias}&gender=${gender}&score=${score}`;
      const scoreResult = await request(app.getHttpServer()).get(endpoint);
      expect(scoreResult.text).toEqual(result);
    }
  };

  it('should test female cubes result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'cubes-quickness',
        score: '10',
        result: '97',
      },
      {
        gender: 'FEMALE',
        alias: 'cubes-quickness',
        score: '11.4',
        result: '72',
      },
      {
        gender: 'FEMALE',
        alias: 'cubes-quickness',
        score: '12.8',
        result: '51',
      },
      {
        gender: 'FEMALE',
        alias: 'cubes-quickness',
        score: '13.7',
        result: '38',
      },
    ];
    await testCategory(tests);
  });

  it('should test male cubes result', async () => {
    const tests = [
      {
        gender: 'MALE',
        alias: 'cubes-quickness',
        score: '8,8',
        result: '100',
      },
      {
        gender: 'MALE',
        alias: 'cubes-quickness',
        score: '9.4',
        result: '84',
      },
      {
        gender: 'MALE',
        alias: 'cubes-quickness',
        score: '12.8',
        result: '30',
      },
      {
        gender: 'MALE',
        alias: 'cubes-quickness',
        score: '10.4',
        result: '65',
      },
    ];
    await testCategory(tests);
  });

  it('should test male distance jumping result', async () => {
    const tests = [
      {
        gender: 'MALE',
        alias: 'distance-jumping',
        score: '283',
        result: '99',
      },
      {
        gender: 'MALE',
        alias: 'distance-jumping',
        score: '257',
        result: '86',
      },
      {
        gender: 'MALE',
        alias: 'distance-jumping',
        score: '230',
        result: '73',
      },
      {
        gender: 'MALE',
        alias: 'distance-jumping',
        score: '214',
        result: '65',
      },
    ];
    await testCategory(tests);
  });

  it('should test female distance jumping result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'distance-jumping',
        score: '234',
        result: '99',
      },
      {
        gender: 'FEMALE',
        alias: 'distance-jumping',
        score: '214',
        result: '89',
      },
      {
        gender: 'FEMALE',
        alias: 'distance-jumping',
        score: '177',
        result: '69',
      },
      {
        gender: 'FEMALE',
        alias: 'distance-jumping',
        score: '135',
        result: '45',
      },
    ];
    await testCategory(tests);
  });

  it('should test female pull up hanging result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'pull-up-hanging',
        score: '1.19',
        result: '97',
      },
      {
        gender: 'FEMALE',
        alias: 'pull-up-hanging',
        score: '1',
        result: '89',
      },
      {
        gender: 'FEMALE',
        alias: 'pull-up-hanging',
        score: '0.33',
        result: '73',
      },
      {
        gender: 'FEMALE',
        alias: 'pull-up-hanging',
        score: '0.22',
        result: '67',
      },
    ];
    await testCategory(tests);
  });

  it('should test male pull up result', async () => {
    const tests = [
      {
        gender: 'MALE',
        alias: 'pull-up',
        score: '30',
        result: '100',
      },
      {
        gender: 'MALE',
        alias: 'pull-up',
        score: '24',
        result: '93',
      },
      {
        gender: 'MALE',
        alias: 'pull-up',
        score: '19',
        result: '85',
      },
      {
        gender: 'MALE',
        alias: 'pull-up',
        score: '9',
        result: '69',
      },
    ];
    await testCategory(tests);
  });

  it('should test female push up half result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'push-up-half',
        score: '32',
        result: '100',
      },
      {
        gender: 'FEMALE',
        alias: 'push-up-half',
        score: '27',
        result: '80',
      },
      {
        gender: 'FEMALE',
        alias: 'push-up-half',
        score: '21',
        result: '61',
      },
      {
        gender: 'FEMALE',
        alias: 'push-up-half',
        score: '11',
        result: '52',
      },
    ];
    await testCategory(tests);
  });

  it('should test female push up result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'push-up',
        score: '20',
        result: '100',
      },
      {
        gender: 'FEMALE',
        alias: 'push-up',
        score: '16',
        result: '95',
      },
      {
        gender: 'FEMALE',
        alias: 'push-up',
        score: '10',
        result: '73',
      },
      {
        gender: 'FEMALE',
        alias: 'push-up',
        score: '6',
        result: '61',
      },
    ];
    await testCategory(tests);
  });

  it('should test male aerobic walking result', async () => {
    const tests = [
      {
        gender: 'MALE',
        alias: 'aerobic-walking',
        score: '12',
        result: '100',
      },
      {
        gender: 'MALE',
        alias: 'aerobic-walking',
        score: '14',
        result: '94',
      },
      {
        gender: 'MALE',
        alias: 'aerobic-walking',
        score: '16.1',
        result: '74',
      },
      {
        gender: 'MALE',
        alias: 'aerobic-walking',
        score: '17.4',
        result: '61',
      },
    ];
    await testCategory(tests);
  });

  it('should test female aerobic walking result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'aerobic-walking',
        score: '13',
        result: '100',
      },
      {
        gender: 'FEMALE',
        alias: 'aerobic-walking',
        score: '15.1',
        result: '97',
      },
      {
        gender: 'FEMALE',
        alias: 'aerobic-walking',
        score: '16.1',
        result: '79',
      },
      {
        gender: 'FEMALE',
        alias: 'aerobic-walking',
        score: '17.4',
        result: '63',
      },
    ];
    await testCategory(tests);
  });

  it('should test female plank result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'plank',
        score: '2.3',
        result: '100',
      },
      {
        gender: 'FEMALE',
        alias: 'plank',
        score: '2',
        result: '85',
      },
      {
        gender: 'FEMALE',
        alias: 'plank',
        score: '1.5',
        result: '80',
      },
      {
        gender: 'FEMALE',
        alias: 'plank',
        score: '1.47',
        result: '76',
      },
    ];
    await testCategory(tests);
  });

  it('should test female abs result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'abs',
        score: '78',
        result: '100',
      },
      {
        gender: 'FEMALE',
        alias: 'abs',
        score: '66',
        result: '89',
      },
      {
        gender: 'FEMALE',
        alias: 'abs',
        score: '55',
        result: '78',
      },
      {
        gender: 'FEMALE',
        alias: 'abs',
        score: '48',
        result: '71',
      },
    ];
    await testCategory(tests);
  });

  it('should test male abs result', async () => {
    const tests = [
      {
        gender: 'MALE',
        alias: 'abs',
        score: '100',
        result: '100',
      },
      {
        gender: 'MALE',
        alias: 'abs',
        score: '90',
        result: '93',
      },
      {
        gender: 'MALE',
        alias: 'abs',
        score: '74',
        result: '79',
      },
      {
        gender: 'MALE',
        alias: 'abs',
        score: '59',
        result: '66',
      },
    ];
    await testCategory(tests);
  });

  it('should test male aerobic result', async () => {
    const tests = [
      {
        gender: 'MALE',
        alias: 'aerobic',
        score: '5.55',
        result: '100',
      },
      {
        gender: 'MALE',
        alias: 'aerobic',
        score: '6.09',
        result: '96',
      },
      {
        gender: 'MALE',
        alias: 'aerobic',
        score: '6.25',
        result: '92',
      },
      {
        gender: 'MALE',
        alias: 'aerobic',
        score: '10.02',
        result: '56',
      },
    ];
    await testCategory(tests);
  });

  it('should test female aerobic result', async () => {
    const tests = [
      {
        gender: 'FEMALE',
        alias: 'aerobic',
        score: '8.08',
        result: '99',
      },
      {
        gender: 'FEMALE',
        alias: 'aerobic',
        score: '9.09',
        result: '84',
      },
      {
        gender: 'FEMALE',
        alias: 'aerobic',
        score: '10.25',
        result: '75',
      },
      {
        gender: 'FEMALE',
        alias: 'aerobic',
        score: '14.46',
        result: '53',
      },
    ];
    await testCategory(tests);
  });
});
