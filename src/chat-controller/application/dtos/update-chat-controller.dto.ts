import { PartialType } from '@nestjs/swagger';
import { CreateChatControllerDto } from './create-chat-controller.dto';

export class UpdateChatControllerDto extends PartialType(CreateChatControllerDto) {}
