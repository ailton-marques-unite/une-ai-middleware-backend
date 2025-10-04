import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
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

export class CreateUpdateMessageControllerDto {
  @ApiProperty({
    description: 'The message number',
    example: 123
  })
  @IsNumber()
  number: number;

  @ApiProperty({
    description: 'The updated text content of the message',
    example: 'This is the updated message text'
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The message key containing message details',
    type: MessageKeyDto
  })
  @ValidateNested()
  @Type(() => MessageKeyDto)
  key: MessageKeyDto;
}
