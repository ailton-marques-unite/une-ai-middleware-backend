import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Contact {
  @ApiProperty({ description: 'Full name of the contact', example: '<string>' })
  fullName: string;

  @ApiProperty({ description: 'WhatsApp user ID', example: '<string>' })
  wuid: string;

  @ApiProperty({ description: 'Phone number of the contact', example: '<string>' })
  phoneNumber: string;

  @ApiPropertyOptional({ description: 'Organization name', example: '<string>' })
  organization?: string;

  @ApiPropertyOptional({ description: 'Email address', example: '<string>' })
  email?: string;

  @ApiPropertyOptional({ description: 'Website URL', example: '<string>' })
  url?: string;
}

export class SendContactMessageResponse {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  number: string;

  @ApiProperty({ 
    description: 'Array of contact information sent', 
    type: [Contact],
    example: [{
      fullName: '<string>',
      wuid: '<string>',
      phoneNumber: '<string>',
      organization: '<string>',
      email: '<string>',
      url: '<string>'
    }]
  })
  contact: Contact[];
}
