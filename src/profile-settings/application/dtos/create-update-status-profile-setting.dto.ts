import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUpdateStatusProfileSettingDto {
  @ApiProperty({ description: 'New status message to set', example: '<string>' })
  @IsString()
  status: string;
}


