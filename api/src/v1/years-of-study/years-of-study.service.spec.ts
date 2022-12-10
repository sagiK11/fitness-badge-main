import { Test, TestingModule } from '@nestjs/testing';
import { YearsOfStudyService } from './years-of-study.service';

describe('YearsOfStudyService', () => {
  let service: YearsOfStudyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YearsOfStudyService],
    }).compile();

    service = module.get<YearsOfStudyService>(YearsOfStudyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
