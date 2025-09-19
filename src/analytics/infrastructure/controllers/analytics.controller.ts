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
  ApiResponse,
  ApiExcludeEndpoint,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { AnalyticsService } from '../../application/services/analytics.service';
import { CreateAnalyticsDto } from '../../application/dtos/create-analytics.dto';
import { UpdateAnalyticsDto } from '../../application/dtos/update-analytics.dto';
import { ListAnalyticsQueryDto } from '../../application/dtos/list-analytics-query.dto';
import { AnalyticsResponseDto } from '../../application/dtos/analytics-response.dto';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Create a new analytics report' })
  @ApiBody({ type: CreateAnalyticsDto })
  @ApiResponse({
    status: 201,
    description: 'Analytics report created successfully',
    type: AnalyticsResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async create(@Body() createAnalyticsDto: CreateAnalyticsDto): Promise<AnalyticsResponseDto> {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all analytics reports with filtering and pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Maximum number of results (default: 100, max: 1000)' })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'inactive', 'pending', 'processing', 'completed', 'error'] })
  @ApiQuery({ name: 'type', required: false, enum: ['call-analytics', 'assistant-analytics', 'campaign-analytics', 'performance-analytics', 'usage-analytics', 'error-analytics', 'cost-analytics', 'custom'] })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'owner', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'description', required: false, type: String })
  @ApiQuery({ name: 'version', required: false, type: String })
  @ApiQuery({ name: 'format', required: false, type: String })
  @ApiQuery({ name: 'schedule', required: false, type: String })
  @ApiQuery({ name: 'isPublic', required: false, type: Boolean })
  @ApiQuery({ name: 'isScheduled', required: false, type: Boolean })
  @ApiQuery({ name: 'emailNotification', required: false, type: Boolean })
  @ApiQuery({ name: 'webhookNotification', required: false, type: Boolean })
  @ApiQuery({ name: 'tag', required: false, type: String })
  @ApiQuery({ name: 'minRunCount', required: false, type: Number })
  @ApiQuery({ name: 'maxRunCount', required: false, type: Number })
  @ApiQuery({ name: 'minSuccessCount', required: false, type: Number })
  @ApiQuery({ name: 'maxSuccessCount', required: false, type: Number })
  @ApiQuery({ name: 'minErrorCount', required: false, type: Number })
  @ApiQuery({ name: 'maxErrorCount', required: false, type: Number })
  @ApiQuery({ name: 'minProcessingTime', required: false, type: Number })
  @ApiQuery({ name: 'maxProcessingTime', required: false, type: Number })
  @ApiQuery({ name: 'minRecordCount', required: false, type: Number })
  @ApiQuery({ name: 'maxRecordCount', required: false, type: Number })
  @ApiQuery({ name: 'createdAtGt', required: false, type: String, description: 'Created after this date (ISO 8601)' })
  @ApiQuery({ name: 'createdAtLt', required: false, type: String, description: 'Created before this date (ISO 8601)' })
  @ApiQuery({ name: 'createdAtGe', required: false, type: String, description: 'Created on or after this date (ISO 8601)' })
  @ApiQuery({ name: 'createdAtLe', required: false, type: String, description: 'Created on or before this date (ISO 8601)' })
  @ApiQuery({ name: 'updatedAtGt', required: false, type: String, description: 'Updated after this date (ISO 8601)' })
  @ApiQuery({ name: 'updatedAtLt', required: false, type: String, description: 'Updated before this date (ISO 8601)' })
  @ApiQuery({ name: 'updatedAtGe', required: false, type: String, description: 'Updated on or after this date (ISO 8601)' })
  @ApiQuery({ name: 'updatedAtLe', required: false, type: String, description: 'Updated on or before this date (ISO 8601)' })
  @ApiResponse({
    status: 200,
    description: 'Analytics reports retrieved successfully',
    type: [AnalyticsResponseDto],
  })
  async findAll(@Query() query: ListAnalyticsQueryDto): Promise<AnalyticsResponseDto[]> {
    return this.analyticsService.findAll(query);
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Get analytics report by ID' })
  @ApiParam({ name: 'id', description: 'Analytics report ID' })
  @ApiResponse({
    status: 200,
    description: 'Analytics report retrieved successfully',
    type: AnalyticsResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Analytics report not found',
  })
  async findOne(@Param('id') id: string): Promise<AnalyticsResponseDto> {
    return this.analyticsService.findById(id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Update analytics report' })
  @ApiParam({ name: 'id', description: 'Analytics report ID' })
  @ApiBody({ type: UpdateAnalyticsDto })
  @ApiResponse({
    status: 200,
    description: 'Analytics report updated successfully',
    type: AnalyticsResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Analytics report not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAnalyticsDto: UpdateAnalyticsDto,
  ): Promise<AnalyticsResponseDto> {
    return this.analyticsService.update(id, updateAnalyticsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Delete analytics report' })
  @ApiParam({ name: 'id', description: 'Analytics report ID' })
  @ApiResponse({
    status: 204,
    description: 'Analytics report deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Analytics report not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.analyticsService.delete(id);
  }
}
