import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AnalyticsRepositoryInterface } from '../../domain/repositories/analytics.repository.interface';
import { CreateAnalyticsRequestDto } from '../../application/dtos/create-analytics-request.dto';
import { AnalyticsResultDto } from '../../application/dtos/analytics-result.dto';

@Injectable()
export class AnalyticsRepository implements AnalyticsRepositoryInterface {
  private readonly baseUrl = `${process.env.VAPI_API_URL}/analytics`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { Authorization: string } {
    const token = this.configService.get<string>('VAPI_SECRET_KEY');
    return { Authorization: `Bearer ${token}` };
  }

  async createAnalytics(
    request: CreateAnalyticsRequestDto,
  ): Promise<AnalyticsResultDto[]> {
    const response = await firstValueFrom(
      this.httpService.post<AnalyticsResultDto[]>(this.baseUrl, request, {
        headers: this.getAuthHeader(),
      }),
    );
    return response.data;
  }
}
