import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

class ContactDto {
  @ApiProperty({ description: 'Full name of the contact', example: '<string>' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'WhatsApp user ID', example: '<string>' })
  @IsString()
  wuid: string;

  @ApiProperty({ description: 'Phone number of the contact', example: '<string>' })
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional({ description: 'Organization name', example: '<string>' })
  @IsOptional()
  @IsString()
  organization?: string;

  @ApiPropertyOptional({ description: 'Email address', example: '<string>' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Website URL', example: '<string>' })
  @IsOptional()
  @IsUrl()
  url?: string;
}

export class CreateSendContactMessageDto {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  @IsString()
  number: string;

  @ApiProperty({ 
    description: 'Array of contact information to send', 
    type: [ContactDto],
    example: [{
      fullName: '<string>',
      wuid: '<string>',
      phoneNumber: '<string>',
      organization: '<string>',
      email: '<string>',
      url: '<string>'
    }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contact: ContactDto[];
}
