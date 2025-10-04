import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class QuotedKey {
  @ApiProperty({ description: 'Quoted message id', example: '<string>' })
  id: string;
}

class QuotedMessage {
  @ApiProperty({ description: 'Quoted text content', example: '<string>' })
  conversation: string;
}

class Quoted {
  @ApiProperty({ description: 'Quoted message key', type: QuotedKey })
  key: QuotedKey;

  @ApiProperty({ description: 'Quoted message payload', type: QuotedMessage })
  message: QuotedMessage;
}

export class SendStickerMessageResponse {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  number: string;

  @ApiProperty({ description: 'Sticker content (URL or base64)', example: '<string>' })
  sticker: string;

  @ApiPropertyOptional({ description: 'Optional delay in milliseconds before sending', example: 123 })
  delay?: number;

  @ApiPropertyOptional({ description: 'Enable link preview in message', example: true })
  linkPreview?: boolean;

  @ApiPropertyOptional({ description: 'Mention everyone in the chat (if supported)', example: true })
  mentionsEveryOne?: boolean;

  @ApiPropertyOptional({ description: 'List of mentioned JIDs', example: ['{{remoteJID}}'], type: [String] })
  mentioned?: string[];

  @ApiPropertyOptional({ description: 'Quoted message (reply context)', type: Quoted })
  quoted?: Quoted;
}
