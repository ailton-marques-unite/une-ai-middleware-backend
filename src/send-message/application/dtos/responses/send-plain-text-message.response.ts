import { ApiProperty } from '@nestjs/swagger';

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

export class SendPlainTextMessageResponse {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  number: string;

  @ApiProperty({ description: 'Text message content', example: '<string>' })
  text: string;

  @ApiProperty({ description: 'Optional delay in milliseconds before sending', example: 123 })
  delay: number;

  @ApiProperty({ description: 'Enable link preview in message', example: true })
  linkPreview: boolean;

  @ApiProperty({ description: 'Mention everyone in the chat (if supported)', example: true })
  mentionsEveryOne: boolean;

  @ApiProperty({ description: 'List of mentioned JIDs', example: ['{{remoteJID}}'], isArray: true, type: String })
  mentioned: string[];

  @ApiProperty({ description: 'Quoted message (reply context)', type: Quoted })
  quoted: Quoted;
}


