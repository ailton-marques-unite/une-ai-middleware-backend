import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateWebsocketDto } from '@/websocket/dto/create-websocket.dto';
import { SetWebsocketResponseDto } from '@/websocket/application/dtos/responses/set-websocket-response.dto';

@Injectable()
export class WebsocketRepository {
  private readonly baseUrl = `${process.env.EVOLUTION_URL}/websocket`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { apikey: string } {
    const apikey = this.configService.get<string>('EVOLUTION_API_KEY');
    return { apikey: `${apikey}` };
  }

  async findByName(instanceName: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/find/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
        if (error?.response?.status === 400) return error.response.data;
        if (error?.response?.status === 404) return error.response.data;
        if (error?.response?.status === 500) return error.response.data;
      throw error;
    }
  }

  async setWebsocket(instanceName: string, createWebsocketDto: CreateWebsocketDto): Promise<SetWebsocketResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SetWebsocketResponseDto>(`${this.baseUrl}/set/${instanceName}`, createWebsocketDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return error.response.data;
      throw error;
    }
  }
}