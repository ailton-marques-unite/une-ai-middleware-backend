import { PartialType } from '@nestjs/swagger';
import { CreateSendMessageDto } from './create-send-message.dto';

export class UpdateSendMessageDto extends PartialType(CreateSendMessageDto) {}
