import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MessageKeyDto {
  @ApiProperty({
    description: 'The remote JID (chat identifier)',
    example: '1234567890@s.whatsapp.net'
  })
  @IsString()
  remoteJid: string;

  @ApiProperty({
    description: 'Whether the message was sent by the current user',
    example: true
  })
  @IsBoolean()
  fromMe: boolean;

  @ApiProperty({
    description: 'The unique identifier of the message',
    example: '3EB0C767D26A8B4A'
  })
  @IsString()
  id: string;
}

export class LastMessageDto {
  @ApiProperty({
    description: 'The message key containing message details',
    type: MessageKeyDto
  })
  @ValidateNested()
  @Type(() => MessageKeyDto)
  key: MessageKeyDto;
}

export class CreateArchiveChatMessageControllerDto {
  @ApiProperty({
    description: 'The last message details',
    type: LastMessageDto
  })
  @ValidateNested()
  @Type(() => LastMessageDto)
  lastMessage: LastMessageDto;

  @ApiProperty({
    description: 'Whether to archive the chat',
    example: true
  })
  @IsBoolean()
  archive: boolean;

  @ApiProperty({
    description: 'The chat identifier',
    example: '1234567890@s.whatsapp.net'
  })
  @IsString()
  chat: string;
}
