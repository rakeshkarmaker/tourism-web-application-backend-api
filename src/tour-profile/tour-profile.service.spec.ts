import { Test, TestingModule } from '@nestjs/testing';
import { TourProfileService } from './tour-profile.service';

describe('TourProfileService', () => {
  let service: TourProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourProfileService],
    }).compile();

    service = module.get<TourProfileService>(TourProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
