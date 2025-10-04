import { ApiProperty } from '@nestjs/swagger';

export class CreateFetchPrivacySettingsProfileSettingDto {
  @ApiProperty({ 
    description: 'Privacy settings configuration', 
    example: {
      readReceipts: true,
      onlineStatus: true,
      lastSeen: 'everyone',
      profilePhoto: 'everyone',
      status: 'everyone'
    }
  })
  privacySettings?: {
    readReceipts?: boolean;
    onlineStatus?: boolean;
    lastSeen?: string;
    profilePhoto?: string;
    status?: string;
  };
}
