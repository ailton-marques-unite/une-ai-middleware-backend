import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AnalyticsQueryDto } from './analytics-query.dto';

export class CreateAnalyticsRequestDto {
  @ApiProperty({
    description: 'List of analytics queries to execute',
    type: [AnalyticsQueryDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AnalyticsQueryDto)
  queries: AnalyticsQueryDto[];
}
