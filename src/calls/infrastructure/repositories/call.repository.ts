import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Call, CallStatus } from '../../domain/entities/call.entity';
import { CreateCallDto } from '../../application/dtos/create-call.dto';
import { UpdateCallDto } from '../../application/dtos/update-call.dto';
import { ListCallsQueryDto } from '../../application/dtos/list-calls-query.dto';
import { CallRepositoryInterface } from '../../domain/repositories/call.repository.interface';

@Injectable()
export class CallRepository implements CallRepositoryInterface {
  private readonly baseUrl = `${process.env.VAPI_API_URL}/call`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { Authorization: string } {
    const token = this.configService.get<string>('VAPI_SECRET_KEY');
    return { Authorization: `Bearer ${token}` };
  }

  async findAll(query: ListCallsQueryDto): Promise<Call[]> {
    // Apply filters based on query parameters
    const params: Record<string, any> = {};
    if (typeof query.limit === 'number') params.limit = query.limit;
    if (query.createdAtGt) params.createdAtGt = query.createdAtGt;
    if (query.createdAtLt) params.createdAtLt = query.createdAtLt;
    if (query.createdAtGe) params.createdAtGe = query.createdAtGe;
    if (query.createdAtLe) params.createdAtLe = query.createdAtLe;
    if (query.updatedAtGt) params.updatedAtGt = query.updatedAtGt;
    if (query.updatedAtGe) params.updatedAtGe = query.updatedAtGe;
    if (query.updatedAtLe) params.updatedAtLe = query.updatedAtLe;
    if (query.status) params.status = query.status;
    if (query.type) params.type = query.type;
    if (query.assistantId) params.assistantId = query.assistantId;
    if (query.customerId) params.customerId = query.customerId;
    if (query.customerPhoneNumber) params.customerPhoneNumber = query.customerPhoneNumber;
    if (query.campaignId) params.campaignId = query.campaignId;
    if (query.sessionId) params.sessionId = query.sessionId;

    const response = await firstValueFrom(
      this.httpService.get<Call[]>(this.baseUrl, {
        headers: this.getAuthHeader(),
        params,
      }),
    );
    return response.data;
  }

  async findById(id: string): Promise<Call | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Call>(`${this.baseUrl}/${id}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async create(data: CreateCallDto): Promise<Call> {
    const response = await firstValueFrom(
      this.httpService.post<Call>(this.baseUrl, data, {
        headers: this.getAuthHeader(),
      }),
    );
    return response.data;
  }

  async update(id: string, data: UpdateCallDto): Promise<Call> {
    const response = await firstValueFrom(
      this.httpService.patch<Call>(`${this.baseUrl}/${id}`, data, {
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
