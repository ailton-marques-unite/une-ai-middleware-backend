import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';

class MessageKeyDto {
  @ApiProperty({ description: 'Message unique identifier', example: '<string>' })
  @IsString()
  id: string;
}

class MessageDto {
  @ApiProperty({ description: 'Message key information', type: MessageKeyDto })
  @ValidateNested()
  @Type(() => MessageKeyDto)
  key: MessageKeyDto;
}

export class CreateGetBase64MessageControllerDto {
  @ApiProperty({
    description: 'Message reference used to fetch the base64 payload',
    type: MessageDto,
    example: {
      message: {
        key: {
          id: '<string>'
        }
      }
    }
  })
  @ValidateNested()
  @Type(() => MessageDto)
  message: MessageDto;

  @ApiProperty({ description: 'Convert the media to MP4 format if applicable', example: true })
  @IsBoolean()
  convertToMp4: boolean;
}


