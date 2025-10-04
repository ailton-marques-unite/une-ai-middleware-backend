import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LastMessageDto {
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

export class CreateMarkMessageUnreadControllerDto {
  @ApiProperty({
    description: 'Array of last messages to mark as unread',
    type: [LastMessageDto],
    example: [
      {
        remoteJid: '1234567890@s.whatsapp.net',
        fromMe: true,
        id: '3EB0C767D26A8B4A'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LastMessageDto)
  lastMessage: LastMessageDto[];

  @ApiProperty({
    description: 'The chat identifier',
    example: '1234567890@s.whatsapp.net'
  })
  @IsString()
  chat: string;
}
