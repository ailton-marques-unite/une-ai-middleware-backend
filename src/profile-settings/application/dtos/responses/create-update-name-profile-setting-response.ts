import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUpdateNameProfileSettingResponseDto {
  @ApiProperty({ description: 'Updated display name', example: '<string>' })
  name: string;

  @ApiProperty({ description: 'Whether the name was updated successfully', example: true })
  success: boolean;

  @ApiPropertyOptional({ description: 'Additional information about the operation', example: 'Name updated successfully' })
  message?: string;
}


