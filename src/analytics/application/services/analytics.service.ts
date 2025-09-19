import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalyticsRepository } from '../../../analytics/infrastructure/repositories/analytics.repository';
import { AnalyticsServiceInterface } from './analytics.service.interface';
import { CreateAnalyticsDto } from '../dtos/create-analytics.dto';
import { UpdateAnalyticsDto } from '../dtos/update-analytics.dto';
import { ListAnalyticsQueryDto } from '../dtos/list-analytics-query.dto';
import { AnalyticsResponseDto } from '../dtos/analytics-response.dto';
import { Analytics, AnalyticsStatus } from '../../domain/entities/analytics.entity';

@Injectable()
export class AnalyticsService implements AnalyticsServiceInterface {
  constructor(
    private readonly analyticsRepository: AnalyticsRepository,
  ) {}

  async findAll(query: ListAnalyticsQueryDto): Promise<AnalyticsResponseDto[]> {
    const analytics = await this.analyticsRepository.findAll(query);
    return analytics.map(this.mapToResponseDto);
  }

  async findById(id: string): Promise<AnalyticsResponseDto> {
    const analytics = await this.analyticsRepository.findById(id);
    if (!analytics) {
      throw new NotFoundException(`Analytics with ID ${id} not found`);
    }
    return this.mapToResponseDto(analytics);
  }

  async create(createAnalyticsDto: CreateAnalyticsDto): Promise<AnalyticsResponseDto> {
    const analytics: Analytics = {
      id: this.generateId(),
      orgId: 'default-org', // This should come from the authenticated user context
      ...createAnalyticsDto,
      status: AnalyticsStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdAnalytics = await this.analyticsRepository.create(analytics);
    return this.mapToResponseDto(createdAnalytics);
  }

  async update(id: string, updateAnalyticsDto: UpdateAnalyticsDto): Promise<AnalyticsResponseDto> {
    const existingAnalytics = await this.analyticsRepository.findById(id);
    if (!existingAnalytics) {
      throw new NotFoundException(`Analytics with ID ${id} not found`);
    }

    const updatedAnalytics = await this.analyticsRepository.update(id, {
      ...updateAnalyticsDto,
      updatedAt: new Date().toISOString(),
    });

    return this.mapToResponseDto(updatedAnalytics);
  }

  async delete(id: string): Promise<void> {
    const existingAnalytics = await this.analyticsRepository.findById(id);
    if (!existingAnalytics) {
      throw new NotFoundException(`Analytics with ID ${id} not found`);
    }

    await this.analyticsRepository.delete(id);
  }

  private mapToResponseDto(analytics: Analytics): AnalyticsResponseDto {
    return {
      id: analytics.id,
      orgId: analytics.orgId,
      name: analytics.name,
      description: analytics.description,
      type: analytics.type,
      status: analytics.status,
      query: analytics.query,
      metrics: analytics.metrics,
      dimensions: analytics.dimensions,
      configuration: analytics.configuration,
      metadata: analytics.metadata,
      format: analytics.format,
      schedule: analytics.schedule,
      isScheduled: analytics.isScheduled,
      lastRunAt: analytics.lastRunAt,
      nextRunAt: analytics.nextRunAt,
      runCount: analytics.runCount,
      successCount: analytics.successCount,
      errorCount: analytics.errorCount,
      lastError: analytics.lastError,
      processingTime: analytics.processingTime,
      recordCount: analytics.recordCount,
      fileSize: analytics.fileSize,
      filePath: analytics.filePath,
      downloadUrl: analytics.downloadUrl,
      email: analytics.email,
      emailNotification: analytics.emailNotification,
      webhookUrl: analytics.webhookUrl,
      webhookNotification: analytics.webhookNotification,
      owner: analytics.owner,
      tags: analytics.tags,
      isPublic: analytics.isPublic,
      category: analytics.category,
      version: analytics.version,
      createdAt: analytics.createdAt,
      updatedAt: analytics.updatedAt,
    };
  }

  private generateId(): string {
    return `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
