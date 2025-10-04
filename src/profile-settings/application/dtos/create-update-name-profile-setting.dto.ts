import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUpdateNameProfileSettingDto {
  @ApiProperty({ description: 'New display name to set', example: '<string>' })
  @IsString()
  name: string;
}


