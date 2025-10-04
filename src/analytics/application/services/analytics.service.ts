import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '../../infrastructure/repositories/analytics.repository';
import { AnalyticsServiceInterface } from './analytics.service.interface';
import { CreateAnalyticsRequestDto } from '../dtos/create-analytics-request.dto';
import { AnalyticsResultDto } from '../dtos/analytics-result.dto';

@Injectable()
export class AnalyticsService implements AnalyticsServiceInterface {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async createAnalytics(
    request: CreateAnalyticsRequestDto,
  ): Promise<AnalyticsResultDto[]> {
    return await this.analyticsRepository.createAnalytics(request);
  }
}
