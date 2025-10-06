import { Test, TestingModule } from '@nestjs/testing';
import { ChatwootService } from '../chatwoot.service';
import { ChatwootRepository } from '../../../infrastructure/repositories/chatwoot.repository';

describe('ChatwootService', () => {
  let service: ChatwootService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatwootService,
        {
          provide: ChatwootRepository,
          useValue: {
            findByName: jest.fn(),
            setChatwoot: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChatwootService>(ChatwootService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
