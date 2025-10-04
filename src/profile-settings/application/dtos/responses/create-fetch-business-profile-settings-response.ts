import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class BusinessProfileDto {
  @ApiProperty({ description: 'Business display name', example: '<string>' })
  name: string;

  @ApiPropertyOptional({ description: 'Business profile description', example: '<string>' })
  description?: string;

  @ApiPropertyOptional({ description: 'Profile picture URL', example: '<string>' })
  profilePictureUrl?: string;

  @ApiPropertyOptional({ description: 'Business website URL', example: '<string>' })
  website?: string;

  @ApiPropertyOptional({ description: 'Business email', example: '<string>' })
  email?: string;
}

export class CreateFetchBusinessProfileSettingsResponseDto {
  @ApiProperty({ description: 'Requested number (JID or MSISDN)', example: '<string>' })
  number: string;

  @ApiProperty({ description: 'Fetched business profile data', type: BusinessProfileDto })
  profile: BusinessProfileDto;
}


