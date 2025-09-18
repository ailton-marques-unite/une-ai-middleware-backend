import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Assistant } from '../../domain/entities/assistant.entity';
import { CreateAssistantDto } from '../../application/dtos/create-assistant.dto';
import { UpdateAssistantDto } from '../../application/dtos/update-assistant.dto';
import { ListAssistantsQueryDto } from '../../application/dtos/list-assistants-query.dto';
import { AssistantRepositoryInterface } from '../../domain/repositories/assistant.repository.interface';

@Injectable()
export class AssistantRepository implements AssistantRepositoryInterface {
  private readonly baseUrl = `${process.env.VAPI_API_URL}/assistant`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { Authorization: string } {
    const token = this.configService.get<string>('VAPI_SECRET_KEY');
    return { Authorization: `Bearer ${token}` };
  }

  async findAll(query: ListAssistantsQueryDto): Promise<Assistant[]> {
    const params: Record<string, any> = {};
    if (typeof query.limit === 'number') params.limit = query.limit;
    if (query.createdAtGt) params.createdAtGt = query.createdAtGt;
    if (query.createdAtLt) params.createdAtLt = query.createdAtLt;
    if (query.createdAtGe) params.createdAtGe = query.createdAtGe;
    if (query.createdAtLe) params.createdAtLe = query.createdAtLe;
    if (query.updatedAtGt) params.updatedAtGt = query.updatedAtGt;
    if (query.updatedAtLt) params.updatedAtLt = query.updatedAtLt;
    if (query.updatedAtGe) params.updatedAtGe = query.updatedAtGe;
    if (query.updatedAtLe) params.updatedAtLe = query.updatedAtLe;

    const response = await firstValueFrom(
      this.httpService.get<Assistant[]>(this.baseUrl, {
        headers: this.getAuthHeader(),
        params,
      }),
    );
    return response.data;
  }

  async findById(id: string): Promise<Assistant | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Assistant>(`${this.baseUrl}/${id}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async create(data: CreateAssistantDto): Promise<Assistant> {
    const response = await firstValueFrom(
      this.httpService.post<Assistant>(this.baseUrl, data, {
        headers: this.getAuthHeader(),
      }),
    );
    return response.data;
  }

  async update(id: string, data: UpdateAssistantDto): Promise<Assistant> {
    const response = await firstValueFrom(
      this.httpService.patch<Assistant>(`${this.baseUrl}/${id}`, data, {
        headers: this.getAuthHeader(),
      }),
    );
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/${id}`, {
        headers: this.getAuthHeader(),
      }),
    );
  }
}
