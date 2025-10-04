import { Test, TestingModule } from '@nestjs/testing';
import { SendMessageController } from '../send-message.controller';
import { SendMessageService } from '../../../application/services/send-message.service';
import { SendMessageRepository } from '../../repositories/send-message.repository';

describe('SendMessageController', () => {
  let controller: SendMessageController;
  let service: SendMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendMessageController],
      providers: [
        { 
          provide: SendMessageService, 
          useValue: { 
            sendPlainTextMessage: jest.fn(), 
            sendStatusMessage: jest.fn(), 
            sendMediaMessage: jest.fn() 
          } 
        },
        { 
          provide: SendMessageRepository, 
          useValue: { 
            sendPlainTextMessage: jest.fn(), 
            sendStatusMessage: jest.fn(), 
            sendMediaMessage: jest.fn() 
          } 
        }
      ],
    }).compile();

    controller = module.get<SendMessageController>(SendMessageController);
    service = module.get<SendMessageService>(SendMessageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
