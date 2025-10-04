import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckIsWhatsappNumberControllerDto } from '../dtos/create-check-isWhatsapp-number-controller.dto';
import { ChatControllerRepository } from '../../infrastructure/repositories/chat-controller.repository';
import { CreateMarkMessageReadControllerDto } from '../dtos/create-mark-message-read-controller.dto';
import { CreateMarkMessageUnreadControllerDto } from '../dtos/create-mark-message-unread-controller.dto';
import { CreateArchiveChatMessageControllerDto } from '../dtos/create-archive-chat-message-controller.dto';
import { CreateUpdateMessageControllerDto } from '../dtos/create-update-message-controller.dto';
import { CreateSendPresenceMessageControllerDto } from '../dtos/create-send-presence-message-controller.dto';
import { CreateUpdateBlockStatusMessageControllerDto } from '../dtos/create-update-block-status-message-controller.dto';
import { CreateChatControllerDto } from '../dtos/create-chat-controller.dto';
import { CreateGetBase64MessageControllerDto } from '../dtos/create-get-base64-message-controller.dto';
import { CreateFindContactsMessageControllerDto } from '../dtos/create-find-contacts-message-controller.dto';
import { CreateFindMessagesMessageControllerDto } from '../dtos/create-find-messages-message-controller.dto';
import { CreateFindStatusMessageControllerDto } from '../dtos/create-find-status-message-controller.dto';

@Injectable()
export class ChatControllerService {
  constructor(private readonly chatControllerRepository: ChatControllerRepository) {}

  async checkIsWhatsappNumber(instanceName: string, createCheckIsWhatsappNumberControllerDto: CreateCheckIsWhatsappNumberControllerDto) {
    const chatController = await this.chatControllerRepository.checkIsWhatsappNumber(instanceName, createCheckIsWhatsappNumberControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async markChatRead(instanceName: string, createMarkMessageReadControllerDto: CreateMarkMessageReadControllerDto) {
    const chatController = await this.chatControllerRepository.markChatRead(instanceName, createMarkMessageReadControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async markChatUnread(instanceName: string, createMarkMessageUnreadControllerDto: CreateMarkMessageUnreadControllerDto) {
    const chatController = await this.chatControllerRepository.markChatUnread(instanceName, createMarkMessageUnreadControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async archiveChat(instanceName: string, createArchiveChatMessageControllerDto: CreateArchiveChatMessageControllerDto) {
    const chatController = await this.chatControllerRepository.archiveChat(instanceName, createArchiveChatMessageControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async updateMessage(instanceName: string, createUpdateMessageControllerDto: CreateUpdateMessageControllerDto) {
    const chatController = await this.chatControllerRepository.updateMessage(instanceName, createUpdateMessageControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async sendPresence(instanceName: string, createSendPresenceMessageControllerDto: CreateSendPresenceMessageControllerDto) {
    const chatController = await this.chatControllerRepository.sendPresence(instanceName, createSendPresenceMessageControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async updateBlockStatus(instanceName: string, createUpdateBlockStatusMessageControllerDto: CreateUpdateBlockStatusMessageControllerDto) {
    const chatController = await this.chatControllerRepository.updateBlockStatus(instanceName, createUpdateBlockStatusMessageControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async fetchProfilePicture(instanceName: string, createChatControllerDto: CreateChatControllerDto) {
    const chatController = await this.chatControllerRepository.fetchProfilePicture(instanceName, createChatControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async getBase64FromMedia(instanceName: string, createGetBase64MessageControllerDto: CreateGetBase64MessageControllerDto) {
    const chatController = await this.chatControllerRepository.getBase64FromMedia(instanceName, createGetBase64MessageControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async findContacts(instanceName: string, createFindContactsMessageControllerDto: CreateFindContactsMessageControllerDto) {
    const chatController = await this.chatControllerRepository.findContacts(instanceName, createFindContactsMessageControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async findMessages(instanceName: string, createFindMessagesMessageControllerDto: CreateFindMessagesMessageControllerDto) {
    const chatController = await this.chatControllerRepository.findMessages(instanceName, createFindMessagesMessageControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async findStatusMessage(instanceName: string, createFindStatusMessageControllerDto: CreateFindStatusMessageControllerDto) {
    const chatController = await this.chatControllerRepository.findStatusMessage(instanceName, createFindStatusMessageControllerDto);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }

  async findChats(instanceName: string) {
    const chatController = await this.chatControllerRepository.findChats(instanceName);
    if (!chatController) {
      throw new NotFoundException('Chat controller not found');
    }
    return chatController;
  }
}
