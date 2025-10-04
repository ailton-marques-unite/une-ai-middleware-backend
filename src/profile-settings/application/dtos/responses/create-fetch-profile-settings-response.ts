import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ProfileSettingsDto {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  number: string;

  @ApiPropertyOptional({ description: 'Profile picture URL', example: '<string>' })
  profilePictureUrl?: string;

  @ApiPropertyOptional({ description: 'Display name', example: '<string>' })
  displayName?: string;

  @ApiPropertyOptional({ description: 'Status message', example: '<string>' })
  statusMessage?: string;
}

export class CreateFetchProfileSettingsResponseDto {
  @ApiProperty({ description: 'Fetched profile settings', type: ProfileSettingsDto })
  profile: ProfileSettingsDto;
}


