import { Test, TestingModule } from '@nestjs/testing';
import { OpenAiService } from '../open-ai.service';
import { OpenAiRepository } from '../../../infrastructure/repositories/open-ai.repository';

describe('OpenAiService', () => {
  let service: OpenAiService; 
  let repository: OpenAiRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAiService, { provide: OpenAiRepository, useValue: {
        createBot: jest.fn(),
        updateBot: jest.fn(),
        deleteBot: jest.fn(),
        findOpenAiCredentials: jest.fn(),
        configOpenAiCredentials: jest.fn(),
        deleteOpenAiCredentials: jest.fn(),
        updateOpenAiCredentials: jest.fn(),
        findOpenAiSettings: jest.fn(),
        updateOpenAiSettings: jest.fn(),
        findOpenAiSessions: jest.fn(),
      }}],
    }).compile();

    service = module.get<OpenAiService>(OpenAiService);
    repository = module.get<OpenAiRepository>(OpenAiRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
