import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUpdatePictureProfileSettingDto {
  @ApiProperty({ description: 'New profile picture (URL or base64)', example: '<string>' })
  @IsString()
  picture: string;
}


