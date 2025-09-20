import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsTimeRangeDto {
  @ApiProperty({
    description: 'Time step for the query',
    example: 'second',
    enum: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']
  })
  @IsString()
  @IsNotEmpty()
  step: string;

  @ApiProperty({
    description: 'Start date/time (ISO 8601 format)',
    example: '2024-01-15T09:30:00Z'
  })
  @IsString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({
    description: 'End date/time (ISO 8601 format)',
    example: '2024-01-15T10:30:00Z'
  })
  @IsString()
  @IsNotEmpty()
  end: string;

  @ApiProperty({
    description: 'Timezone for the query',
    example: 'UTC',
    required: false
  })
  @IsString()
  @IsOptional()
  timezone?: string;
}
