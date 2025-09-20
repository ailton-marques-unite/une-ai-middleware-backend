import { CreateAnalyticsRequestDto } from '../../application/dtos/create-analytics-request.dto';
import { AnalyticsResultDto } from '../../application/dtos/analytics-result.dto';

export interface AnalyticsRepositoryInterface {
  createAnalytics(request: CreateAnalyticsRequestDto): Promise<AnalyticsResultDto[]>;
}
