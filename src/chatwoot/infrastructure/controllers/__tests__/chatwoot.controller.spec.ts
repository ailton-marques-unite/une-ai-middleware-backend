import { Test, TestingModule } from '@nestjs/testing';
import { ChatwootController } from '../chatwoot.controller';
import { ChatwootService } from '../../../application/services/chatwoot.service';

describe('ChatwootController', () => {
  let controller: ChatwootController;
  let service: ChatwootService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatwootController],
      providers: [
        {
          provide: ChatwootService,
          useValue: {
            findByName: jest.fn().mockResolvedValue('found'),
            setChatwoot: jest.fn().mockResolvedValue('set'),
          },
        },
      ],
    }).compile();

    controller = module.get<ChatwootController>(ChatwootController);
    service = module.get<ChatwootService>(ChatwootService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate findByName to service', async () => {
    const result = await controller.findByName('instance-1');
    expect(service.findByName).toHaveBeenCalledWith('instance-1');
    expect(result).toBe('found');
  });

  it('should delegate setChatwoot to service', async () => {
    const dto: any = { enabled: true };
    const result = await controller.setChatwoot('instance-2', dto);
    expect(service.setChatwoot).toHaveBeenCalledWith('instance-2', dto);
    expect(result).toBe('set');
  });
});
