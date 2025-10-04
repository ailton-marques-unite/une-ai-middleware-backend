import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsOperationDto {
  @ApiProperty({
    description: 'The operation to perform (sum, count, avg, min, max, etc.)',
    example: 'sum',
    enum: ['sum', 'count', 'avg', 'min', 'max', 'distinct'],
  })
  @IsString()
  @IsNotEmpty()
  operation: string;

  @ApiProperty({
    description: 'The column to perform the operation on',
    example: 'duration',
  })
  @IsString()
  @IsNotEmpty()
  column: string;
}
