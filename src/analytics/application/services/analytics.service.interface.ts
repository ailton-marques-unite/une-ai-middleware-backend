import { CreateAnalyticsRequestDto } from '../dtos/create-analytics-request.dto';
import { AnalyticsResultDto } from '../dtos/analytics-result.dto';

export interface AnalyticsServiceInterface {
  createAnalytics(request: CreateAnalyticsRequestDto): Promise<AnalyticsResultDto[]>;
}
