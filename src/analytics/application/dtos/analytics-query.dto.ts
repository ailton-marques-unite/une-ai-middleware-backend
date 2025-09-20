import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AnalyticsOperationDto } from './analytics-operation.dto';

export class AnalyticsQueryDto {
  @ApiProperty({
    description: 'The table to query (e.g., call, assistant, campaign)',
    example: 'call',
    enum: ['call', 'assistant', 'campaign', 'session', 'phone-number', 'tool']
  })
  @IsString()
  @IsNotEmpty()
  table: string;

  @ApiProperty({
    description: 'Unique name for this query',
    example: 'call-duration-summary'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'List of operations to perform on the data',
    type: [AnalyticsOperationDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnalyticsOperationDto)
  operations: AnalyticsOperationDto[];

  @ApiProperty({
    description: 'Optional filters to apply to the query',
    required: false,
    example: { assistantId: '123', status: 'completed' }
  })
  @IsOptional()
  filters?: Record<string, any>;

  @ApiProperty({
    description: 'Group by fields for aggregation',
    required: false,
    example: ['assistantId', 'status']
  })
  @IsOptional()
  @IsArray()
  groupBy?: string[];

  @ApiProperty({
    description: 'Time range for the query',
    required: false,
    example: {
      start: '2024-01-01T00:00:00Z',
      end: '2024-01-31T23:59:59Z',
      step: 'day',
      timezone: 'UTC'
    }
  })
  @IsOptional()
  timeRange?: {
    start: string;
    end: string;
    step: string;
    timezone?: string;
  };
}
