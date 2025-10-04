import { ApiProperty } from '@nestjs/swagger';

class MessageKey {
  @ApiProperty({ description: 'Remote JID (chat identifier)', example: '<string>' })
  remoteJid: string;

  @ApiProperty({ description: 'Whether the message is from the current user', example: true })
  fromMe: boolean;

  @ApiProperty({ description: 'Message ID to react to', example: '<string>' })
  id: string;
}

export class SendReactionMessageResponse {
  @ApiProperty({ 
    description: 'Message key information for the message being reacted to', 
    type: MessageKey 
  })
  key: MessageKey;

  @ApiProperty({ description: 'Reaction emoji or text', example: '🚀' })
  reaction: string;
}
