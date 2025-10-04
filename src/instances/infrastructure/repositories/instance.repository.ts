import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Instance } from '../../domain/entities/instance.entity';
import { CreateInstanceResponse } from '@/instances/application/dtos/responses/create-instance.response';
import { InstanceRepositoryInterface } from '../../domain/repositories/instance.repository.interface';
import { CreateInstanceDto } from '@/instances/application/dtos/create-instance.dto';
import { SetPresenceDto } from '@/instances/application/dtos/set-presence.dto';

@Injectable()
export class InstanceRepository implements InstanceRepositoryInterface {
  private readonly baseUrl = `${process.env.EVOLUTION_URL}/instance`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { apikey: string } {
    const apikey = this.configService.get<string>('EVOLUTION_API_KEY');
    return { apikey: `${apikey}` };
  }

  async findByName(instanceName: string, number?: string): Promise<Instance | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Instance>(`${this.baseUrl}/connect/${instanceName}${number ? `?number=${number}` : ''} ${number ? `&number=${number}` : ''}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async fetchByName(instanceName: string, instanceId?: string): Promise<Instance | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Instance>(`${this.baseUrl}/fetchInstances?instanceName=${instanceName}${instanceId ? `?instanceId=${instanceId}` : ''} ${instanceId ? `&instanceId=${instanceId}` : ''}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async findStatusConnect(instanceName: string): Promise<Instance | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Instance>(`${this.baseUrl}/connectionState/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async create(createInstanceDto: CreateInstanceDto): Promise<CreateInstanceResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<CreateInstanceResponse>(`${this.baseUrl}/create`, createInstanceDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async update(instanceName: string): Promise<Instance | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<Instance>(`${this.baseUrl}/restart/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async logout(instanceName: string): Promise<Instance | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete<Instance>(`${this.baseUrl}/logout/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async delete(instanceName: string): Promise<Instance | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete<Instance>(`${this.baseUrl}/delete/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async setPresence(instanceName: string, setPresenceDto: SetPresenceDto): Promise<Instance | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<Instance>(`${this.baseUrl}/setPresence/${instanceName}`, setPresenceDto, {
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
