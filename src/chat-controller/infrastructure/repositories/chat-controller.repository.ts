import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateCheckIsWhatsappNumberControllerDto } from '@/chat-controller/application/dtos/create-check-isWhatsapp-number-controller.dto';
import { CreateCheckIsWhatsappNumberControllerResponseDto } from '@/chat-controller/application/dtos/response/create-check-isWhatsapp-number-controller.response';
import { CreateMarkMessageReadControllerDto } from '@/chat-controller/application/dtos/create-mark-message-read-controller.dto';
import { CreateMarkMessageReadControllerResponseDto } from '@/chat-controller/application/dtos/response/create-mark-message-read-controller.response';
import { CreateMarkMessageUnreadControllerDto } from '@/chat-controller/application/dtos/create-mark-message-unread-controller.dto';
import { CreateMarkMessageUnreadControllerResponseDto } from '@/chat-controller/application/dtos/response/create-mark-message-unread-controller.response';
import { CreateArchiveChatMessageControllerDto } from '@/chat-controller/application/dtos/create-archive-chat-message-controller.dto';
import { CreateArchiveChatMessageControllerResponseDto } from '@/chat-controller/application/dtos/response/create-archive-chat-message-controller.response';
import { CreateUpdateMessageControllerDto } from '@/chat-controller/application/dtos/create-update-message-controller.dto';
import { CreateUpdateMessageControllerResponseDto } from '@/chat-controller/application/dtos/response/create-update-message-controller.response';
import { CreateSendPresenceMessageControllerResponseDto } from '@/chat-controller/application/dtos/response/create-send-presence-message-controller.response';
import { CreateSendPresenceMessageControllerDto } from '@/chat-controller/application/dtos/create-send-presence-message-controller.dto';
import { CreateUpdateBlockStatusMessageControllerDto } from '@/chat-controller/application/dtos/create-update-block-status-message-controller.dto';
import { CreateUpdateBlockStatusMessageControllerResponseDto } from '@/chat-controller/application/dtos/response/create-update-block-status-message-controller.response';
import { CreateChatControllerResponseDto } from '@/chat-controller/application/dtos/response/create-chat-controller.response';
import { CreateChatControllerDto } from '@/chat-controller/application/dtos/create-chat-controller.dto';
import { CreateGetBase64MessageControllerDto } from '@/chat-controller/application/dtos/create-get-base64-message-controller.dto';
import { CreateGetBase64MessageControllerResponseDto } from '@/chat-controller/application/dtos/response/create-get-base64-message-controller.response';
import { CreateFindContactsMessageControllerDto } from '@/chat-controller/application/dtos/create-find-contacts-message-controller.dto';
import { CreateFindContactsMessageControllerResponseDto } from '@/chat-controller/application/dtos/response/create-find-contacts-message-controller-response';
import { CreateFindMessagesMessageControllerDto } from '@/chat-controller/application/dtos/create-find-messages-message-controller.dto';
import { CreateFindMessagesMessageControllerResponseDto } from '@/chat-controller/application/dtos/response/create-find-messages-message-controller-response';
import { CreateFindStatusMessageControllerDto } from '@/chat-controller/application/dtos/create-find-status-message-controller.dto';
import { CreateFindStatusMessageControllerResponseDto } from '@/chat-controller/application/dtos/response/create-find-status-message-controller-response';

@Injectable()
export class ChatControllerRepository {
  private readonly baseUrl = `${process.env.EVOLUTION_URL}/chat`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { apikey: string } {
    const apikey = this.configService.get<string>('EVOLUTION_API_KEY');
    return { apikey: `${apikey}` };
  }

  async checkIsWhatsappNumber(instanceName: string, createCheckIsWhatsappNumberControllerDto: CreateCheckIsWhatsappNumberControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateCheckIsWhatsappNumberControllerResponseDto>(`${this.baseUrl}/whatsappNumbers/${instanceName}`, createCheckIsWhatsappNumberControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async markChatRead(instanceName: string, createMarkMessageReadControllerDto: CreateMarkMessageReadControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateMarkMessageReadControllerResponseDto>(`${this.baseUrl}/markMessageAsRead/${instanceName}`, createMarkMessageReadControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async markChatUnread(instanceName: string, createMarkMessageUnreadControllerDto: CreateMarkMessageUnreadControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateMarkMessageUnreadControllerResponseDto>(`${this.baseUrl}/markChatUnread/${instanceName}`, createMarkMessageUnreadControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async archiveChat(instanceName: string, createArchiveChatMessageControllerDto: CreateArchiveChatMessageControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateArchiveChatMessageControllerResponseDto>(`${this.baseUrl}/archiveChat/${instanceName}`, createArchiveChatMessageControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async updateMessage(instanceName: string, createUpdateMessageControllerDto: CreateUpdateMessageControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateUpdateMessageControllerResponseDto>(`${this.baseUrl}/updateMessage/${instanceName}`, createUpdateMessageControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendPresence(instanceName: string, createSendPresenceMessageControllerDto: CreateSendPresenceMessageControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateSendPresenceMessageControllerResponseDto>(`${this.baseUrl}/sendPresence/${instanceName}`, createSendPresenceMessageControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async updateBlockStatus(instanceName: string, createUpdateBlockStatusMessageControllerDto: CreateUpdateBlockStatusMessageControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateUpdateBlockStatusMessageControllerResponseDto>(`${this.baseUrl.replace('/chat', '/message')}/updateBlockStatus/${instanceName}`, createUpdateBlockStatusMessageControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async fetchProfilePicture(instanceName: string, createChatControllerDto: CreateChatControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateChatControllerResponseDto>(`${this.baseUrl}/fetchProfilePictureUrl/${instanceName}`, createChatControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async getBase64FromMedia(instanceName: string, createGetBase64MessageControllerDto: CreateGetBase64MessageControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateGetBase64MessageControllerResponseDto>(`${this.baseUrl}/getBase64FromMediaMessage/${instanceName}`, createGetBase64MessageControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findContacts(instanceName: string, createFindContactsMessageControllerDto: CreateFindContactsMessageControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateFindContactsMessageControllerResponseDto>(`${this.baseUrl}/findContacts/${instanceName}`, createFindContactsMessageControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findMessages(instanceName: string, createFindMessagesMessageControllerDto: CreateFindMessagesMessageControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateFindMessagesMessageControllerResponseDto>(`${this.baseUrl}/findMessages/${instanceName}`, createFindMessagesMessageControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findStatusMessage(instanceName: string, createFindStatusMessageControllerDto: CreateFindStatusMessageControllerDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateFindStatusMessageControllerResponseDto>(`${this.baseUrl}/findStatusMessage/${instanceName}`, createFindStatusMessageControllerDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findChats(instanceName: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/findChats/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }
}