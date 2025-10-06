import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatControllerService } from '../../application/services/chat-controller.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCheckIsWhatsappNumberControllerDto } from '../../application/dtos/create-check-isWhatsapp-number-controller.dto';
import { CreateCheckIsWhatsappNumberControllerResponseDto } from '../../application/dtos/response/create-check-isWhatsapp-number-controller.response';
import { CreateMarkMessageReadControllerDto } from '../../application/dtos/create-mark-message-read-controller.dto';
import { CreateMarkMessageUnreadControllerDto } from '../../application/dtos/create-mark-message-unread-controller.dto';
import { CreateMarkMessageReadControllerResponseDto } from '../../application/dtos/response/create-mark-message-read-controller.response';
import { CreateMarkMessageUnreadControllerResponseDto } from '../../application/dtos/response/create-mark-message-unread-controller.response';
import { CreateArchiveChatMessageControllerDto } from '../../application/dtos/create-archive-chat-message-controller.dto';
import { CreateArchiveChatMessageControllerResponseDto } from '../../application/dtos/response/create-archive-chat-message-controller.response';
import { CreateUpdateMessageControllerDto } from '../../application/dtos/create-update-message-controller.dto';
import { CreateUpdateMessageControllerResponseDto } from '../../application/dtos/response/create-update-message-controller.response';
import { CreateSendPresenceMessageControllerDto } from '../../application/dtos/create-send-presence-message-controller.dto';
import { CreateSendPresenceMessageControllerResponseDto } from '../../application/dtos/response/create-send-presence-message-controller.response';
import { CreateUpdateBlockStatusMessageControllerDto } from '../../application/dtos/create-update-block-status-message-controller.dto';
import { CreateUpdateBlockStatusMessageControllerResponseDto } from '../../application/dtos/response/create-update-block-status-message-controller.response';
import { CreateChatControllerDto } from '../../application/dtos/create-chat-controller.dto';
import { CreateChatControllerResponseDto } from '../../application/dtos/response/create-chat-controller.response';
import { CreateGetBase64MessageControllerDto } from '../../application/dtos/create-get-base64-message-controller.dto';
import { CreateGetBase64MessageControllerResponseDto } from '../../application/dtos/response/create-get-base64-message-controller.response';
import { CreateFindContactsMessageControllerDto } from '../../application/dtos/create-find-contacts-message-controller.dto';
import { CreateFindContactsMessageControllerResponseDto } from '../../application/dtos/response/create-find-contacts-message-controller-response';
import { CreateFindMessagesMessageControllerDto } from '../../application/dtos/create-find-messages-message-controller.dto';
import { CreateFindMessagesMessageControllerResponseDto } from '../../application/dtos/response/create-find-messages-message-controller-response';
import { CreateFindStatusMessageControllerDto } from '../../application/dtos/create-find-status-message-controller.dto';
import { CreateFindStatusMessageControllerResponseDto } from '../../application/dtos/response/create-find-status-message-controller-response';
import { CreateFindChatsMessageControllerResponseDto } from '../../application/dtos/response/create-find-chats-message-controller-response';

@ApiTags('EvolutionApi')
@Controller('chat')
export class ChatControllerController {
  constructor(private readonly chatControllerService: ChatControllerService) {}

  @Post('/checkIsWhatsappNumber/:instanceName')
  @ApiOperation({ summary: 'Check if a number is a WhatsApp number' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateCheckIsWhatsappNumberControllerDto,
    description: 'The number to check if it is a WhatsApp number',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "numbers": ["Array of phone numbers"]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateCheckIsWhatsappNumberControllerResponseDto,
    description: 'The number was checked successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'The number was not checked for instance name'
  })
  checkIsWhatsappNumber(@Param('instanceName') instanceName: string, @Body() createCheckIsWhatsappNumberControllerDto: CreateCheckIsWhatsappNumberControllerDto) {
    return this.chatControllerService.checkIsWhatsappNumber(instanceName, createCheckIsWhatsappNumberControllerDto);
  }

  @Post('/markMessageAsRead/:instanceName')
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateMarkMessageReadControllerDto,
    description: 'The message to mark as read',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "readMessages": ["Array of messages"]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateMarkMessageReadControllerResponseDto, 
    description: 'The message was marked as read successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The message was not marked as read for instance name' })
  markChatRead(@Param('instanceName') instanceName: string, @Body() createMarkMessageReadControllerDto: CreateMarkMessageReadControllerDto) {
    return this.chatControllerService.markChatRead(instanceName, createMarkMessageReadControllerDto);
  }

  @Post('/markChatUnread/:instanceName')
  @ApiOperation({ summary: 'Mark a chat as unread' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateMarkMessageUnreadControllerDto,
    description: 'The chat to mark as unread',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "unreadMessages": ["Array of messages"]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateMarkMessageUnreadControllerResponseDto, 
    description: 'The chat was marked as unread successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The chat was not marked as unread for instance name' })
  markChatUnread(@Param('instanceName') instanceName: string, @Body() createMarkMessageUnreadControllerDto: CreateMarkMessageUnreadControllerDto) {
    return this.chatControllerService.markChatUnread(instanceName, createMarkMessageUnreadControllerDto);
  }

  @Post('/archiveChat/:instanceName')
  @ApiOperation({ summary: 'Archive a chat' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateArchiveChatMessageControllerDto,
    description: 'The chat to archive',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "archive": true,
          "chat": "1234567890@s.whatsapp.net"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateArchiveChatMessageControllerResponseDto, 
    description: 'The chat was archived successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The chat was not archived for instance name' })
  archiveChat(@Param('instanceName') instanceName: string, @Body() createArchiveChatMessageControllerDto: CreateArchiveChatMessageControllerDto) {
    return this.chatControllerService.archiveChat(instanceName, createArchiveChatMessageControllerDto);
  }

  @Post('/updateMessage/:instanceName')
  @ApiOperation({ summary: 'Update a message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateUpdateMessageControllerDto,
    description: 'The message to update',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "number": 123,
          "text": "This is the updated message text",
          "key": {
            "remoteJid": "1234567890@s.whatsapp.net",
            "fromMe": true,
            "id": "3EB0C767D26A8B4A"
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateUpdateMessageControllerResponseDto, 
    description: 'The message was updated successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The message was not updated for instance name' })
  updateMessage(@Param('instanceName') instanceName: string, @Body() createUpdateMessageControllerDto: CreateUpdateMessageControllerDto) {
    return this.chatControllerService.updateMessage(instanceName, createUpdateMessageControllerDto);
  }

  @Post('/sendPresence/:instanceName')
  @ApiOperation({ summary: 'Send a presence message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendPresenceMessageControllerDto,
    description: 'The presence message to send',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "number": "1234567890",
          "options": {
            "delay": 123,
            "presence": "composing",
            "number": "1234567890"
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateSendPresenceMessageControllerResponseDto, 
    description: 'The presence message was sent successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The presence message was not sent for instance name' })
  @ApiResponse({ 
    status: 400, 
    description: 'The presence message was not sent for invalid options' })
  sendPresence(@Param('instanceName') instanceName: string, @Body() createSendPresenceMessageControllerDto: CreateSendPresenceMessageControllerDto) {
    return this.chatControllerService.sendPresence(instanceName, createSendPresenceMessageControllerDto);
  }

  @Post('/updateBlockStatus/:instanceName')
  @ApiOperation({ summary: 'Update a block status' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateUpdateBlockStatusMessageControllerDto,
    description: 'The block status to update',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "number": "1234567890",
          "status": "block"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateUpdateBlockStatusMessageControllerResponseDto, 
    description: 'The block status was updated successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The block status was not updated for instance name' })
  updateBlockStatus(@Param('instanceName') instanceName: string, @Body() createUpdateBlockStatusMessageControllerDto: CreateUpdateBlockStatusMessageControllerDto) {
    return this.chatControllerService.updateBlockStatus(instanceName, createUpdateBlockStatusMessageControllerDto);
  }

  @Post('/fetchProfilePicture/:instanceName')
  @ApiOperation({ summary: 'Fetch a profile picture' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateChatControllerDto,
    description: 'The chat to fetch the profile picture for',
    examples: {
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "number": "1234567890"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateChatControllerResponseDto, 
    description: 'The profile picture was fetched successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The profile picture was not fetched for instance name' })
  fetchProfilePicture(@Param('instanceName') instanceName: string, @Body() createChatControllerDto: CreateChatControllerDto) {
    return this.chatControllerService.fetchProfilePicture(instanceName, createChatControllerDto);
  }

  @Post('/getBase64FromMedia/:instanceName')
  @ApiOperation({ summary: 'Get a base64 from media' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateGetBase64MessageControllerDto,
    description: 'The media to get the base64 from',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "message": {
            "key": {
              "id": "3EB0C767D26A8B4A"
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateGetBase64MessageControllerResponseDto, 
    description: 'The base64 was fetched successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The base64 was not fetched for instance name' })
  getBase64FromMedia(@Param('instanceName') instanceName: string, @Body() createGetBase64MessageControllerDto: CreateGetBase64MessageControllerDto) {
    return this.chatControllerService.getBase64FromMedia(instanceName, createGetBase64MessageControllerDto);
  }

  @Post('/findContacts/:instanceName')
  @ApiOperation({ summary: 'Find contacts' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateFindContactsMessageControllerDto,
    description: 'The contacts to find',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "where": {
            "id": "3EB0C767D26A8B4A"
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateFindContactsMessageControllerResponseDto, 
    description: 'The contacts were found successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The contacts were not found for instance name' })
  findContacts(@Param('instanceName') instanceName: string, @Body() createFindContactsMessageControllerDto: CreateFindContactsMessageControllerDto) {
    return this.chatControllerService.findContacts(instanceName, createFindContactsMessageControllerDto);
  }

  @Post('/findMessages/:instanceName')
  @ApiOperation({ summary: 'Find messages' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateFindMessagesMessageControllerDto,
    description: 'The messages to find',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "where": {
            "key": {
              "id": "3EB0C767D26A8B4A"
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateFindMessagesMessageControllerResponseDto, 
    description: 'The messages were found successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The messages were not found for instance name' })
  findMessages(@Param('instanceName') instanceName: string, @Body() createFindMessagesMessageControllerDto: CreateFindMessagesMessageControllerDto) {
    return this.chatControllerService.findMessages(instanceName, createFindMessagesMessageControllerDto);
  }

  @Post('/findStatusMessage/:instanceName')
  @ApiOperation({ summary: 'Find status message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateFindStatusMessageControllerDto,
    description: 'The status message to find',
    examples: {
      'full-config': {
        summary: 'Full configuration',
        description: 'Complete configuration with all options',
        value: {
          "where": {
            "id": "3EB0C767D26A8B4A"
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateFindStatusMessageControllerResponseDto, 
    description: 'The status message was found successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The status message was not found for instance name' })
  findStatusMessage(@Param('instanceName') instanceName: string, @Body() createFindStatusMessageControllerDto: CreateFindStatusMessageControllerDto) {
    return this.chatControllerService.findStatusMessage(instanceName, createFindStatusMessageControllerDto);
  }

  @Post('/findChats/:instanceName')
  @ApiOperation({ summary: 'Find chats' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ 
    status: 200,
    type: CreateFindChatsMessageControllerResponseDto,
    description: 'The chats were found successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The chats were not found for instance name' })
  findChats(@Param('instanceName') instanceName: string) {
    return this.chatControllerService.findChats(instanceName);
  }
}
