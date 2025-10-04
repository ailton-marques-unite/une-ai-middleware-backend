import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSendMessageDto } from '../dtos/create-send-message.dto';
import { SendMessageRepository } from '../../infrastructure/repositories/send-message.repository';
import { CreateSendStatusMessageDto } from '../dtos/create-send-status-message.dto';
import { CreateSendMediaMessageDto } from '../dtos/create-send-media-message.dto';
import { CreateSendWhatsappAudioMessageDto } from '../dtos/create-send-whatsapp-audio-message.dto';
import { CreateSendStickerMessageDto } from '../dtos/create-send-sticker-message.dto';
import { CreateSendLocationMessageDto } from '../dtos/create-send-location-message.dto';
import { CreateSendContactMessageDto } from '../dtos/create-send-contact-message.dto';
import { CreateSendReactionMessageDto } from '../dtos/create-send-reaction-message.dto';
import { CreateSendPollMessageDto } from '../dtos/create-send-poll-message.dto';
import { CreateSendListMessageDto } from '../dtos/create-send-list-message.dto';
import { CreateSendButtonsMessageDto } from '../dtos/create-send-buttons-message.dto';

@Injectable()
export class SendMessageService {
  constructor(private readonly sendMessageRepository: SendMessageRepository) {}

  async sendPlainTextMessage(instanceName: string, createSendMessageDto: CreateSendMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendPlainTextMessage(instanceName, createSendMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendStatusMessage(instanceName: string, createSendMessageDto: CreateSendStatusMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendStatusMessage(instanceName, createSendMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendMediaMessage(instanceName: string, createSendMediaMessageDto: CreateSendMediaMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendMediaMessage(instanceName, createSendMediaMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendWhatsappAudioMessage(instanceName: string, createSendWhatsappAudioMessageDto: CreateSendWhatsappAudioMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendWhatsappAudioMessage(instanceName, createSendWhatsappAudioMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendStickerMessage(instanceName: string, createSendStickerMessageDto: CreateSendStickerMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendStickerMessage(instanceName, createSendStickerMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendLocationMessage(instanceName: string, createSendLocationMessageDto: CreateSendLocationMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendLocationMessage(instanceName, createSendLocationMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendContactMessage(instanceName: string, createSendContactMessageDto: CreateSendContactMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendContactMessage(instanceName, createSendContactMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendReactionMessage(instanceName: string, createSendReactionMessageDto: CreateSendReactionMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendReactionMessage(instanceName, createSendReactionMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendPollMessage(instanceName: string, createSendPollMessageDto: CreateSendPollMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendPollMessage(instanceName, createSendPollMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendListMessage(instanceName: string, createSendListMessageDto: CreateSendListMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendListMessage(instanceName, createSendListMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }

  async sendButtonsMessage(instanceName: string, createSendButtonsMessageDto: CreateSendButtonsMessageDto) {
    const sendMessage = await this.sendMessageRepository.sendButtonsMessage(instanceName, createSendButtonsMessageDto);
    if (!sendMessage) {
      throw new NotFoundException('Send message not found');
    }
    return sendMessage;
  }
}
