import { Test, TestingModule } from '@nestjs/testing';
import { ChatControllerController } from '../chat-controller.controller';
import { ChatControllerService } from '../../../application/services/chat-controller.service';
import { ChatControllerRepository } from '../../repositories/chat-controller.repository';

describe('ChatControllerController', () => {
  let controller: ChatControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatControllerController],
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

    controller = module.get<ChatControllerController>(ChatControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
