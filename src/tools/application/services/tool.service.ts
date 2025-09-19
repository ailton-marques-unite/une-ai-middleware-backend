import { Injectable, NotFoundException } from '@nestjs/common';
import { ToolRepository } from '../../infrastructure/repositories/tool.repository';
import { ToolServiceInterface } from './tool.service.interface';
import { CreateToolDto } from '../dtos/create-tool.dto';
import { UpdateToolDto } from '../dtos/update-tool.dto';
import { ListToolsQueryDto } from '../dtos/list-tools-query.dto';
import { ToolResponseDto } from '../dtos/tool-response.dto';
import { Tool, ToolStatus } from '../../domain/entities/tool.entity';

@Injectable()
export class ToolService implements ToolServiceInterface {
  constructor(
    private readonly toolRepository: ToolRepository,
  ) {}

  async findAll(query: ListToolsQueryDto): Promise<ToolResponseDto[]> {
    const tools = await this.toolRepository.findAll(query);
    return tools.map(this.mapToResponseDto);
  }

  async findById(id: string): Promise<ToolResponseDto> {
    const tool = await this.toolRepository.findById(id);
    if (!tool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }
    return this.mapToResponseDto(tool);
  }

  async create(createToolDto: CreateToolDto): Promise<ToolResponseDto> {
    const tool: Tool = {
      id: this.generateId(),
      orgId: 'default-org', // This should come from the authenticated user context
      ...createToolDto,
      status: ToolStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      enabled: true,
    };

    const createdTool = await this.toolRepository.create(tool);
    return this.mapToResponseDto(createdTool);
  }

  async update(id: string, updateToolDto: UpdateToolDto): Promise<ToolResponseDto> {
    const existingTool = await this.toolRepository.findById(id);
    if (!existingTool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }

    const updatedTool = await this.toolRepository.update(id, {
      ...updateToolDto,
      updatedAt: new Date().toISOString(),
    });

    return this.mapToResponseDto(updatedTool);
  }

  async delete(id: string): Promise<void> {
    const existingTool = await this.toolRepository.findById(id);
    if (!existingTool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }

    await this.toolRepository.delete(id);
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

  private generateId(): string {
    return `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
