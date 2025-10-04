import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Row {
  @ApiProperty({ description: 'Row title', example: '<string>' })
  title: string;

  @ApiProperty({ description: 'Row description', example: '<string>' })
  description: string;

  @ApiProperty({ description: 'Row ID', example: '<string>' })
  rowId: string;
}

class Section {
  @ApiProperty({ description: 'Section title', example: '<string>' })
  title: string;

  @ApiProperty({ 
    description: 'Array of rows in this section', 
    type: [Row]
  })
  rows: Row[];
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

export class SendListMessageResponse {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  number: string;

  @ApiProperty({ description: 'List title', example: '<string>' })
  title: string;

  @ApiProperty({ description: 'List description', example: '<string>' })
  description: string;

  @ApiProperty({ description: 'Button text', example: '<string>' })
  buttonText: string;

  @ApiProperty({ description: 'Footer text', example: '<string>' })
  footerText: string;

  @ApiProperty({ 
    description: 'Array of list sections with rows', 
    type: [Section]
  })
  values: Section[];

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
