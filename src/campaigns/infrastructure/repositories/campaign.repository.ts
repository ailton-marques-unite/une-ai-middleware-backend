import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Campaign, CampaignStatus } from '../../domain/entities/campaign.entity';
import { CreateCampaignDto } from '../../application/dtos/create-campaign.dto';
import { UpdateCampaignDto } from '../../application/dtos/update-campaign.dto';
import { ListCampaignsQueryDto } from '../../application/dtos/list-campaigns-query.dto';
import { CampaignRepositoryInterface } from '../../domain/repositories/campaign.repository.interface';

@Injectable()
export class CampaignRepository implements CampaignRepositoryInterface {
  private readonly baseUrl = `${process.env.VAPI_API_URL}/campaign`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { Authorization: string } {
    const token = this.configService.get<string>('VAPI_SECRET_KEY');
    return { Authorization: `Bearer ${token}` };
  }

  async findAll(query: ListCampaignsQueryDto): Promise<Campaign[]> {
    // Apply filters based on query parameters
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
    if (query.status) params.status = query.status;
    if (query.type) params.type = query.type;
    if (query.assistantId) params.assistantId = query.assistantId;
    if (query.createdBy) params.createdBy = query.createdBy;
    if (query.campaignGroupId) params.campaignGroupId = query.campaignGroupId;
    if (query.name) params.name = query.name;

    const response = await firstValueFrom(
      this.httpService.get<Campaign[]>(this.baseUrl, {
        headers: this.getAuthHeader(),
        params,
      }),
    );
    return response.data;
  }

  async findById(id: string): Promise<Campaign | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Campaign>(`${this.baseUrl}/${id}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async create(data: CreateCampaignDto): Promise<Campaign> {
    const response = await firstValueFrom(
      this.httpService.post<Campaign>(this.baseUrl, data, {
        headers: this.getAuthHeader(),
      }),
    );
    return response.data;
  }

  async update(id: string, data: UpdateCampaignDto): Promise<Campaign> {
    const response = await firstValueFrom(
      this.httpService.patch<Campaign>(`${this.baseUrl}/${id}`, data, {
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
