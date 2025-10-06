import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiExcludeEndpoint,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ToolService } from '../../application/services/tool.service';
import { CreateToolDto } from '../../application/dtos/create-tool.dto';
import { UpdateToolDto } from '../../application/dtos/update-tool.dto';
import { ListToolsQueryDto } from '../../application/dtos/list-tools-query.dto';
import { ToolResponseDto } from '../../application/dtos/tool-response.dto';

@ApiTags('Vapi')
@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get()
  @ApiOperation({ summary: 'List all tools with filtering and pagination' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of results (default: 100, max: 1000)',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'inactive', 'pending', 'error', 'deprecated'],
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: [
      'function',
      'webhook',
      'api',
      'database',
      'email',
      'sms',
      'calendar',
      'crm',
      'payment',
      'custom',
    ],
  })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'author', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'description', required: false, type: String })
  @ApiQuery({ name: 'version', required: false, type: String })
  @ApiQuery({ name: 'environment', required: false, type: String })
  @ApiQuery({ name: 'region', required: false, type: String })
  @ApiQuery({ name: 'isPublic', required: false, type: Boolean })
  @ApiQuery({ name: 'enabled', required: false, type: Boolean })
  @ApiQuery({ name: 'tag', required: false, type: String })
  @ApiQuery({ name: 'minUsageCount', required: false, type: Number })
  @ApiQuery({ name: 'maxUsageCount', required: false, type: Number })
  @ApiQuery({ name: 'minSuccessRate', required: false, type: Number })
  @ApiQuery({ name: 'maxSuccessRate', required: false, type: Number })
  @ApiQuery({ name: 'minAverageResponseTime', required: false, type: Number })
  @ApiQuery({ name: 'maxAverageResponseTime', required: false, type: Number })
  @ApiQuery({
    name: 'createdAtGt',
    required: false,
    type: String,
    description: 'Created after this date (ISO 8601)',
  })
  @ApiQuery({
    name: 'createdAtLt',
    required: false,
    type: String,
    description: 'Created before this date (ISO 8601)',
  })
  @ApiQuery({
    name: 'createdAtGe',
    required: false,
    type: String,
    description: 'Created on or after this date (ISO 8601)',
  })
  @ApiQuery({
    name: 'createdAtLe',
    required: false,
    type: String,
    description: 'Created on or before this date (ISO 8601)',
  })
  @ApiQuery({
    name: 'updatedAtGt',
    required: false,
    type: String,
    description: 'Updated after this date (ISO 8601)',
  })
  @ApiQuery({
    name: 'updatedAtLt',
    required: false,
    type: String,
    description: 'Updated before this date (ISO 8601)',
  })
  @ApiQuery({
    name: 'updatedAtGe',
    required: false,
    type: String,
    description: 'Updated on or after this date (ISO 8601)',
  })
  @ApiQuery({
    name: 'updatedAtLe',
    required: false,
    type: String,
    description: 'Updated on or before this date (ISO 8601)',
  })
  @ApiResponse({
    status: 200,
    description: 'Tools retrieved successfully',
    type: [ToolResponseDto],
  })
  async findAll(@Query() query: ListToolsQueryDto): Promise<ToolResponseDto[]> {
    return this.toolService.findAll(query);
  }
}
