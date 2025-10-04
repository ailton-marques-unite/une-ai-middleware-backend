import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';

class MessageKeyDto {
  @ApiProperty({ description: 'Remote JID (chat identifier)', example: '<string>' })
  @IsString()
  remoteJid: string;

  @ApiProperty({ description: 'Whether the message is from the current user', example: true })
  @IsBoolean()
  fromMe: boolean;

  @ApiProperty({ description: 'Message ID to react to', example: '<string>' })
  @IsString()
  id: string;
}

export class CreateSendReactionMessageDto {
  @ApiProperty({ 
    description: 'Message key information for the message being reacted to', 
    type: MessageKeyDto 
  })
  @ValidateNested()
  @Type(() => MessageKeyDto)
  key: MessageKeyDto;

  @ApiProperty({ description: 'Reaction emoji or text', example: '🚀' })
  @IsString()
  reaction: string;
}
