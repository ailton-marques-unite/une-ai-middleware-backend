import { Injectable } from '@nestjs/common';
import { ToolRepository } from '../../infrastructure/repositories/tool.repository';
import { ToolServiceInterface } from './tool.service.interface';
import { ListToolsQueryDto } from '../dtos/list-tools-query.dto';
import { ToolResponseDto } from '../dtos/tool-response.dto';
import { Tool } from '../../domain/entities/tool.entity';

@Injectable()
export class ToolService implements ToolServiceInterface {
  constructor(private readonly toolRepository: ToolRepository) {}

  async findAll(query: ListToolsQueryDto): Promise<ToolResponseDto[]> {
    const tools = await this.toolRepository.findAll(query);
    return tools.map(this.mapToResponseDto);
  }

  private mapToResponseDto(tool: Tool): ToolResponseDto {
    return {
      id: tool.id,
      orgId: tool.orgId,
      name: tool.name,
      description: tool.description,
      type: tool.type,
      status: tool.status,
      function: tool.function,
      endpoint: tool.endpoint,
      webhook: tool.webhook,
      authentication: tool.authentication,
      version: tool.version,
      category: tool.category,
      tags: tool.tags,
      configuration: tool.configuration,
      metadata: tool.metadata,
      isPublic: tool.isPublic,
      author: tool.author,
      documentation: tool.documentation,
      icon: tool.icon,
      usageCount: tool.usageCount,
      successRate: tool.successRate,
      averageResponseTime: tool.averageResponseTime,
      lastUsedAt: tool.lastUsedAt,
      lastErrorAt: tool.lastErrorAt,
      lastErrorMessage: tool.lastErrorMessage,
      rateLimit: tool.rateLimit,
      rateLimitWindow: tool.rateLimitWindow,
      enabled: tool.enabled,
      environment: tool.environment,
      region: tool.region,
      permissions: tool.permissions,
      webhookSecret: tool.webhookSecret,
      validateWebhook: tool.validateWebhook,
      webhookEndpoint: tool.webhookEndpoint,
      webhookMethod: tool.webhookMethod,
      webhookHeaders: tool.webhookHeaders,
      createdAt: tool.createdAt,
      updatedAt: tool.updatedAt,
    };
  }
}
