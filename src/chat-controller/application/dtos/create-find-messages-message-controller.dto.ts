import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class KeyDto {
  @ApiProperty({ description: 'Remote JID (chat identifier)', example: '<string>' })
  @IsString()
  remoteJid: string;
}

class WhereDto {
  @ApiProperty({ description: 'Message key filter', type: KeyDto })
  @ValidateNested()
  @Type(() => KeyDto)
  key: KeyDto;
}

export class CreateFindMessagesMessageControllerDto {
  @ApiProperty({
    description: 'Filter criteria to find messages',
    type: WhereDto,
    example: {
      where: {
        key: {
          remoteJid: '<string>'
        }
      }
    }
  })
  @ValidateNested()
  @Type(() => WhereDto)
  where: WhereDto;
}


