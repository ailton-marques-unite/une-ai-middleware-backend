import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateOpenAiResponseDto } from '@/open-ai/application/dtos/responses/create-open-ai-response.dto';
import { CreateOpenAiDto } from '@/open-ai/application/dtos/create-open-ai.dto';
import { OpenAiBotResponseDto } from '@/open-ai/application/dtos/responses/open-ai-bot-response.dto';
import { UpdateOpenAiDto } from '@/open-ai/application/dtos/update-open-ai.dto';
import { ConfigOpenAiCredentialsDto } from '@/open-ai/application/dtos/config-open-ai-credentials.dto';
import { UpdateOpenAiCredentialsDto } from '@/open-ai/application/dtos/update-open-ai-credentials.dto';
import { UpdateOpenAiSettingsDto } from '@/open-ai/application/dtos/update-open-ai-settings.dto';

@Injectable()
export class OpenAiRepository {
  private readonly baseUrl = `${process.env.EVOLUTION_URL}/openai`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { apikey: string } {
    const apikey = this.configService.get<string>('EVOLUTION_API_KEY');
    return { apikey: `${apikey}` };
  }

  async createBot(instanceName: string, createOpenAiDto: CreateOpenAiDto): Promise<CreateOpenAiResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateOpenAiResponseDto>(`${this.baseUrl}/create/${instanceName}`, createOpenAiDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findBot(instanceName: string, openaiBotId: string): Promise<OpenAiBotResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<OpenAiBotResponseDto>(`${this.baseUrl}/find/${openaiBotId}/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findAllBots(instanceName: string): Promise<OpenAiBotResponseDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<OpenAiBotResponseDto[]>(`${this.baseUrl}/find/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null; 
      throw error;
    }
  }

  async updateBot(instanceName: string, openaiBotId: string, updateOpenAiDto: UpdateOpenAiDto): Promise<OpenAiBotResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<OpenAiBotResponseDto>(`${this.baseUrl}/update/${openaiBotId}/${instanceName}`, updateOpenAiDto, {
          headers: this.getAuthHeader(),
          params: {
            instanceName: instanceName,
            openaiBotId: openaiBotId,
          },
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async deleteBot(instanceName: string, openaiBotId: string): Promise<OpenAiBotResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete<OpenAiBotResponseDto>(`${this.baseUrl}/delete/${openaiBotId}/${instanceName}`, {
          headers: this.getAuthHeader(),
          params: {
            instanceName: instanceName,
            openaiBotId: openaiBotId,
          },
        }),
        );
        return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findOpenAiCredentials(instanceName: string): Promise<OpenAiBotResponseDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<OpenAiBotResponseDto[]>(`${this.baseUrl}/creds/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async configOpenAiCredentials(instanceName: string, configOpenAiCredentialsDto: ConfigOpenAiCredentialsDto): Promise<OpenAiBotResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<OpenAiBotResponseDto>(`${this.baseUrl}/creds/${instanceName}`, configOpenAiCredentialsDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async deleteOpenAiCredentials(instanceName: string, openaiCredsId: string): Promise<OpenAiBotResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete<OpenAiBotResponseDto>(`${this.baseUrl}/creds/${openaiCredsId}/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async updateOpenAiCredentials(instanceName: string, updateOpenAiCredentialsDto: UpdateOpenAiCredentialsDto): Promise<OpenAiBotResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<OpenAiBotResponseDto>(`${this.baseUrl}/settings/${instanceName}`, updateOpenAiCredentialsDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findOpenAiSettings(instanceName: string): Promise<OpenAiBotResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<OpenAiBotResponseDto>(`${this.baseUrl}/fetchSettings/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async updateOpenAiSettings(instanceName: string, updateOpenAiSettingsDto: UpdateOpenAiSettingsDto): Promise<OpenAiBotResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<OpenAiBotResponseDto>(`${this.baseUrl}/changeStatus/${instanceName}`, updateOpenAiSettingsDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findOpenAiSessions(instanceName: string, openaiBotId: string): Promise<OpenAiBotResponseDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<OpenAiBotResponseDto[]>(`${this.baseUrl}/fetchSessions/${openaiBotId}/${instanceName}`, {
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