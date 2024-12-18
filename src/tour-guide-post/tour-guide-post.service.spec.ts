import { Test, TestingModule } from '@nestjs/testing';
import { TourGuidePostService } from './tour-guide-post.service';

describe('TourGuidePostService', () => {
  let service: TourGuidePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourGuidePostService],
    }).compile();

    service = module.get<TourGuidePostService>(TourGuidePostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
