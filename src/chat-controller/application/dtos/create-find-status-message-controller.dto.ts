import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';

class WhereDto {
  @ApiProperty({ description: 'Internal unique identifier', example: '<string>' })
  @IsString()
  _id: string;

  @ApiProperty({ description: 'Message unique identifier', example: '<string>' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Remote JID (chat identifier)', example: '<string>' })
  @IsString()
  remoteJid: string;

  @ApiProperty({ description: 'Whether the message was sent by the user', example: true })
  @IsBoolean()
  fromMe: boolean;
}

export class CreateFindStatusMessageControllerDto {
  @ApiProperty({
    description: 'Filter criteria to find status messages',
    type: WhereDto,
    example: {
      where: {
        _id: '<string>',
        id: '<string>',
        remoteJid: '<string>',
        fromMe: true
      }
    }
  })
  @ValidateNested()
  @Type(() => WhereDto)
  where: WhereDto;

  @ApiProperty({ description: 'Maximum number of results to return', example: 123 })
  @IsNumber()
  limit: number;
}


