import { Test, TestingModule } from '@nestjs/testing';
import { SendMessageService } from '../../services/send-message.service';
import { SendMessageRepository } from '../../../infrastructure/repositories/send-message.repository';

describe('SendMessageService', () => {
  let service: SendMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendMessageService,
        { provide: SendMessageRepository, 
          useValue: { sendPlainTextMessage: jest.fn(), 
            sendStatusMessage: jest.fn(), 
            sendMediaMessage: jest.fn() } 
        }
      ],
    }).compile();

    service = module.get<SendMessageService>(SendMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
