import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class MessageKeyDto {
  @ApiProperty({ description: 'Message unique identifier', example: '3F8F8EFFC44AA5ABD377' })
  id: string;

  @ApiProperty({ description: 'Whether the message was sent by the user', example: false })
  fromMe: boolean;

  @ApiProperty({ description: 'Remote JID (chat identifier)', example: '5511949803319@s.whatsapp.net' })
  remoteJid: string;

  @ApiPropertyOptional({ description: 'Sender LID when available', example: '73882044219437@lid' })
  senderLid?: string;
}

class MessageContextInfoDto {
  @ApiPropertyOptional({ description: 'Arbitrary context info object', example: { expiration: 0 } })
  // Using loose typing here to accommodate many possible shapes
  // eslint-disable-next-line @typescript-eslint/ban-types
  context?: object;
}

class ConversationContentDto {
  @ApiPropertyOptional({ description: 'Conversation text content', example: 'oi' })
  conversation?: string;
}

class TemplateMessageDto {
  @ApiPropertyOptional({ description: 'Template message payload', example: { hydratedTemplate: { hydratedButtons: [] } } })
  // eslint-disable-next-line @typescript-eslint/ban-types
  hydratedTemplate?: object;

  @ApiPropertyOptional({ description: 'Alternative four-row template payload', example: { hydratedButtons: [] } })
  // eslint-disable-next-line @typescript-eslint/ban-types
  hydratedFourRowTemplate?: object;
}

class MessagePayloadDto {
  @ApiPropertyOptional({ description: 'Conversation fields when type is conversation', type: ConversationContentDto })
  conversation?: string;

  @ApiPropertyOptional({ description: 'Template message content', type: TemplateMessageDto })
  // eslint-disable-next-line @typescript-eslint/ban-types
  templateMessage?: object;

  @ApiPropertyOptional({ description: 'Additional context for message', example: { deviceListMetadataVersion: 2 } })
  // eslint-disable-next-line @typescript-eslint/ban-types
  messageContextInfo?: object;
}

class LastMessageDto {
  @ApiProperty({ description: 'Unique identifier of the last message', example: 'cmgaq5sxbote4qc53an81gbu8' })
  id: string;

  @ApiProperty({ description: 'Key information for the last message', type: MessageKeyDto })
  key: MessageKeyDto;

  @ApiProperty({ description: 'Display name associated to the last message', example: 'Arthur Buran' })
  pushName: string;

  @ApiPropertyOptional({ description: 'Participant JID, when applicable', example: null })
  participant?: string | null;

  @ApiProperty({ description: 'Message type', example: 'conversation' })
  messageType: string;

  @ApiProperty({ description: 'Message payload content', type: MessagePayloadDto })
  message: MessagePayloadDto;

  @ApiPropertyOptional({ description: 'Context information for the message', example: { ephemeralSettingTimestamp: '0' } })
  // eslint-disable-next-line @typescript-eslint/ban-types
  contextInfo?: object | null;

  @ApiProperty({ description: 'Source platform of the message', example: 'desktop' })
  source: string;

  @ApiProperty({ description: 'UNIX timestamp (s) of the message', example: 1759488729 })
  messageTimestamp: number;

  @ApiProperty({ description: 'Instance identifier', example: 'e9cdf512-c2e8-4eb9-82b9-85c8c4cb1527' })
  instanceId: string;

  @ApiPropertyOptional({ description: 'Session identifier if available', example: null })
  sessionId?: string | null;

  @ApiProperty({ description: 'Delivery status of the last message', example: 'DELIVERY_ACK' })
  status: string;
}

class ChatSummaryDto {
  @ApiPropertyOptional({ description: 'Chat identifier when available', example: null })
  id?: string | null;

  @ApiProperty({ description: 'Last message data', type: LastMessageDto })
  lastMessage: LastMessageDto;

  @ApiProperty({ description: 'Unread messages count in chat', example: 0 })
  unreadCount: number;

  @ApiProperty({ description: 'Whether the chat is saved/pinned', example: false })
  isSaved: boolean;
}

export class CreateFindChatsMessageControllerResponseDto {
  @ApiProperty({
    description: 'Array of chat summaries',
    type: [ChatSummaryDto]
  })
  chats: ChatSummaryDto[];

  @ApiProperty({ description: 'Total number of chats returned', example: 20 })
  total: number;
}


