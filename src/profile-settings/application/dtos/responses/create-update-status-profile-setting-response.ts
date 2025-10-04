import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUpdateStatusProfileSettingResponseDto {
  @ApiProperty({ description: 'Updated status message', example: '<string>' })
  status: string;

  @ApiProperty({ description: 'Whether the status was updated successfully', example: true })
  success: boolean;

  @ApiPropertyOptional({ description: 'Additional information about the operation', example: 'Status updated successfully' })
  message?: string;
}


