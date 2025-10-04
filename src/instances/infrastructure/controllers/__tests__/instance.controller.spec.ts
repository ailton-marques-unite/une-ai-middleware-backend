import { Test, TestingModule } from '@nestjs/testing';
import { InstanceController } from '../instance.controller';
import { InstanceService } from '../../../application/services/instance.service';
import { InstanceRepository } from '../../../infrastructure/repositories/instance.repository';

describe('InstanceController', () => {
  let controller: InstanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstanceController],
      providers: [
        InstanceService,
        { provide: InstanceRepository, useValue: { findByName: jest.fn() } },
      ],
    }).compile();

    controller = module.get<InstanceController>(InstanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
