import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class FoundContactDto {
  @ApiProperty({ description: 'Contact unique identifier (JID or UUID)', example: '<string>' })
  id: string;

  @ApiPropertyOptional({ description: 'Display name of the contact', example: '<string>' })
  name?: string;

  @ApiPropertyOptional({ description: 'Phone number associated with the contact', example: '<string>' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Profile picture URL if available', example: '<string>' })
  profilePictureUrl?: string;
}

export class CreateFindContactsMessageControllerResponseDto {
  @ApiProperty({
    description: 'List of contacts matching the filter',
    type: [FoundContactDto],
    example: [
      {
        id: '<string>',
        name: '<string>',
        phoneNumber: '<string>',
        profilePictureUrl: '<string>'
      }
    ]
  })
  contacts: FoundContactDto[];

  @ApiProperty({ description: 'Total number of contacts found', example: 1 })
  total: number;
}


