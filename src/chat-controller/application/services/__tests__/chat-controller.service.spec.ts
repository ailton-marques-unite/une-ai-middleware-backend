import { Test, TestingModule } from '@nestjs/testing';
import { ChatControllerService } from '../chat-controller.service';
import { ChatControllerRepository } from '../../../infrastructure/repositories/chat-controller.repository';

describe('ChatControllerService', () => {
  let service: ChatControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatControllerService, 
        { provide: ChatControllerRepository, useValue: {
          checkIsWhatsappNumber: jest.fn(),
          markMessageRead: jest.fn(),
          markMessageUnread: jest.fn(),
          archiveChatMessage: jest.fn(),
          updateMessage: jest.fn(),
          sendPresence: jest.fn(),
          updateBlockStatus: jest.fn(),
          fetchProfilePicture: jest.fn(),
        }}
      ],
    }).compile();

    service = module.get<ChatControllerService>(ChatControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
