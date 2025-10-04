import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Button {
  @ApiProperty({ description: 'Button title', example: '<string>' })
  title: string;

  @ApiProperty({ description: 'Button display text', example: '<string>' })
  displayText: string;

  @ApiProperty({ description: 'Button ID', example: '<string>' })
  id: string;
}

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

export class SendButtonsMessageResponse {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  number: string;

  @ApiProperty({ description: 'Message title', example: '<string>' })
  title: string;

  @ApiProperty({ description: 'Message description', example: '<string>' })
  description: string;

  @ApiProperty({ description: 'Footer text', example: '<string>' })
  footer: string;

  @ApiProperty({ 
    description: 'Array of buttons', 
    type: [Button]
  })
  buttons: Button[];

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
