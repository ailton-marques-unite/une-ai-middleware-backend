import { Test, TestingModule } from '@nestjs/testing';
import { OpenAiController } from '../open-ai.controller';
import { OpenAiService } from '../../../application/services/open-ai.service';
import { OpenAiRepository } from '../../repositories/open-ai.repository';

describe('OpenAiController', () => {
  let controller: OpenAiController;
  let service: OpenAiService;
  let repository: OpenAiRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenAiController],
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

    controller = module.get<OpenAiController>(OpenAiController);
    service = module.get<OpenAiService>(OpenAiService);
    repository = module.get<OpenAiRepository>(OpenAiRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
