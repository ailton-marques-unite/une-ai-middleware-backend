import { Test, TestingModule } from '@nestjs/testing';
import { InstanceService } from '../instance.service';
import { InstanceRepository } from '../../../infrastructure/repositories/instance.repository';

describe('InstanceService', () => {
  let service: InstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstanceService,
        { provide: InstanceRepository, useValue: { findByName: jest.fn() } },
      ],
    }).compile();

    service = module.get<InstanceService>(InstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
