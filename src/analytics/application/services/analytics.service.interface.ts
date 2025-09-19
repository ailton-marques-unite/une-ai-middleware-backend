import { CreateAnalyticsDto } from '../dtos/create-analytics.dto';
import { UpdateAnalyticsDto } from '../dtos/update-analytics.dto';
import { ListAnalyticsQueryDto } from '../dtos/list-analytics-query.dto';
import { AnalyticsResponseDto } from '../dtos/analytics-response.dto';

export interface AnalyticsServiceInterface {
  findAll(query: ListAnalyticsQueryDto): Promise<AnalyticsResponseDto[]>;
  findById(id: string): Promise<AnalyticsResponseDto>;
  create(createAnalyticsDto: CreateAnalyticsDto): Promise<AnalyticsResponseDto>;
  update(id: string, updateAnalyticsDto: UpdateAnalyticsDto): Promise<AnalyticsResponseDto>;
  delete(id: string): Promise<void>;
}
