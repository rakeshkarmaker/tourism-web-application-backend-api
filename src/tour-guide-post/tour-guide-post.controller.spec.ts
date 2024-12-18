import { Test, TestingModule } from '@nestjs/testing';
import { TourGuidePostController } from './tour-guide-post.controller';

describe('TourGuidePostController', () => {
  let controller: TourGuidePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourGuidePostController],
    }).compile();

    controller = module.get<TourGuidePostController>(TourGuidePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
