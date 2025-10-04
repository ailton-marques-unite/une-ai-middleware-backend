import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateSendMessageDto } from '../../application/dtos/create-send-message.dto';
import { SendPlainTextMessageResponse } from '../../application/dtos/responses/send-plain-text-message.response';
import { CreateSendStatusMessageDto } from '../../application/dtos/create-send-status-message.dto';
import { SendStatusMessageResponse } from '../../application/dtos/responses/send-status-message.response';
import { CreateSendMediaMessageDto } from '../../application/dtos/create-send-media-message.dto';
import { SendMediaMessageResponse } from '../../application/dtos/responses/send-media-message.response';
import { CreateSendWhatsappAudioMessageDto } from '../../application/dtos/create-send-whatsapp-audio-message.dto';
import { SendWhatsappAudioMessageResponse } from '../../application/dtos/responses/send-whatsapp-audio-message.response';
import { CreateSendStickerMessageDto } from '../../application/dtos/create-send-sticker-message.dto';
import { SendStickerMessageResponse } from '../../application/dtos/responses/send-sticker-message.response';
import { CreateSendLocationMessageDto } from '../../application/dtos/create-send-location-message.dto';
import { SendLocationMessageResponse } from '../../application/dtos/responses/send-location-message.response';
import { CreateSendContactMessageDto } from '../../application/dtos/create-send-contact-message.dto';
import { SendContactMessageResponse } from '../../application/dtos/responses/send-contact-message.response';
import { CreateSendReactionMessageDto } from '../../application/dtos/create-send-reaction-message.dto';
import { SendReactionMessageResponse } from '../../application/dtos/responses/send-reaction-message.response';
import { CreateSendPollMessageDto } from '../../application/dtos/create-send-poll-message.dto';
import { SendPollMessageResponse } from '../../application/dtos/responses/send-poll-message.response';
import { SendListMessageResponse } from '../../application/dtos/responses/send-list-message.response';
import { CreateSendListMessageDto } from '../../application/dtos/create-send-list-message.dto';
import { SendButtonsMessageResponse } from '../../application/dtos/responses/send-buttons-message.response';
import { CreateSendButtonsMessageDto } from '../../application/dtos/create-send-buttons-message.dto';

@Injectable()
export class SendMessageRepository {
  private readonly baseUrl = `${process.env.EVOLUTION_URL}/message`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  private getAuthHeader(): { apikey: string } {
    const apikey = this.configService.get<string>('EVOLUTION_API_KEY');
    return { apikey: `${apikey}` };
  }

  async sendPlainTextMessage(instanceName: string, sendPlainTextMessageDto: CreateSendMessageDto): Promise<SendPlainTextMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendPlainTextMessageResponse>(`${this.baseUrl}/sendText/${instanceName}`, sendPlainTextMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendStatusMessage(instanceName: string, sendStatusMessageDto: CreateSendStatusMessageDto): Promise<SendStatusMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendStatusMessageResponse>(`${this.baseUrl}/sendStatus/${instanceName}`, sendStatusMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendMediaMessage(instanceName: string, sendMediaMessageDto: CreateSendMediaMessageDto): Promise<SendMediaMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendMediaMessageResponse>(`${this.baseUrl}/sendMedia/${instanceName}`, sendMediaMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendWhatsappAudioMessage(instanceName: string, sendWhatsappAudioMessageDto: CreateSendWhatsappAudioMessageDto): Promise<SendWhatsappAudioMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendWhatsappAudioMessageResponse>(`${this.baseUrl}/sendWhatsAppAudio/${instanceName}`, sendWhatsappAudioMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendStickerMessage(instanceName: string, sendStickerMessageDto: CreateSendStickerMessageDto): Promise<SendStickerMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendStickerMessageResponse>(`${this.baseUrl}/sendSticker/${instanceName}`, sendStickerMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendLocationMessage(instanceName: string, sendLocationMessageDto: CreateSendLocationMessageDto): Promise<SendLocationMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendLocationMessageResponse>(`${this.baseUrl}/sendLocation/${instanceName}`, sendLocationMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendContactMessage(instanceName: string, sendContactMessageDto: CreateSendContactMessageDto): Promise<SendContactMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendContactMessageResponse>(`${this.baseUrl}/sendContact/${instanceName}`, sendContactMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendReactionMessage(instanceName: string, sendReactionMessageDto: CreateSendReactionMessageDto): Promise<SendReactionMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendReactionMessageResponse>(`${this.baseUrl}/sendReaction/${instanceName}`, sendReactionMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendPollMessage(instanceName: string, sendPollMessageDto: CreateSendPollMessageDto): Promise<SendPollMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendPollMessageResponse>(`${this.baseUrl}/sendPoll/${instanceName}`, sendPollMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendListMessage(instanceName: string, sendListMessageDto: CreateSendListMessageDto): Promise<SendListMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendListMessageResponse>(`${this.baseUrl}/sendList/${instanceName}`, sendListMessageDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async sendButtonsMessage(instanceName: string, sendButtonsMessageDto: CreateSendButtonsMessageDto): Promise<SendButtonsMessageResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SendButtonsMessageResponse>(`${this.baseUrl}/sendButtons/${instanceName}`, sendButtonsMessageDto, {
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