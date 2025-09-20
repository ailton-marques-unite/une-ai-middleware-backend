import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ToolRepositoryInterface } from '../../domain/repositories/tool.repository.interface';
import {
  Tool,
  ToolStatus,
  ToolType,
  HttpMethod,
} from '../../domain/entities/tool.entity';
import { ListToolsQueryDto } from '../../application/dtos/list-tools-query.dto';

@Injectable()
export class ToolRepository implements ToolRepositoryInterface {
  private readonly baseUrl = `${process.env.VAPI_API_URL}/tool`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { Authorization: string } {
    const token = this.configService.get<string>('VAPI_SECRET_KEY');
    return { Authorization: `Bearer ${token}` };
  }

  async findAll(query: ListToolsQueryDto): Promise<Tool[]> {
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
      this.httpService.get<Tool[]>(this.baseUrl, {
        headers: this.getAuthHeader(),
        params,
      }),
    );
    return response.data;
  }
}
