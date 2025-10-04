import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFetchBusinessProfileSettingDto {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  @IsString()
  number: string;
}


