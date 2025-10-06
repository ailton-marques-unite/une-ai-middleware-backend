import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SetChatwookDtoResponse } from '../../application/dtos/responses/set-chatwook-dto.response';
import { CreateChatwootDto } from '../../application/dtos/create-chatwoot.dto';

@Injectable()
export class ChatwootRepository {
  private readonly baseUrl = `${process.env.EVOLUTION_URL}/chatwoot`;

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

  async setChatwoot(instanceName: string, createChatwootDto: CreateChatwootDto): Promise<SetChatwookDtoResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SetChatwookDtoResponse>(`${this.baseUrl}/set/${instanceName}`, createChatwootDto, {
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
}