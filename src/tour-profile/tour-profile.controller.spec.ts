import { Test, TestingModule } from '@nestjs/testing';
import { TourProfileController } from './tour-profile.controller';

describe('TourProfileController', () => {
  let controller: TourProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourProfileController],
    }).compile();

    controller = module.get<TourProfileController>(TourProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
