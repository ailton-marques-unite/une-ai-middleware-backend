import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUpdatePictureProfileSettingResponseDto {
  @ApiProperty({ description: 'Updated profile picture (URL or base64)', example: '<string>' })
  picture: string;

  @ApiProperty({ description: 'Whether the picture was updated successfully', example: true })
  success: boolean;

  @ApiPropertyOptional({ description: 'Additional information about the operation', example: 'Picture updated successfully' })
  message?: string;
}


