import { IsString, IsNotEmpty, IsObject, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AnalyticsTimeRangeDto } from './analytics-time-range.dto';

export class AnalyticsResultDto {
  @ApiProperty({
    description: 'Unique name for the query result',
    example: 'call-duration-summary'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Time range for this result',
    type: AnalyticsTimeRangeDto
  })
  @IsObject()
  timeRange: AnalyticsTimeRangeDto;

  @ApiProperty({
    description: 'Query results - list of unique groups with aggregation results',
    example: [
      {
        date: '2023-01-01',
        assistantId: '123',
        endedReason: 'customer-ended-call',
        sumDuration: 120,
        avgCost: 10.5
      },
      {
        date: '2023-01-02',
        assistantId: '123',
        endedReason: 'customer-did-not-give-microphone-permission',
        sumDuration: 0,
        avgCost: 0
      }
    ]
  })
  @IsArray()
  result: Record<string, any>[];
}
