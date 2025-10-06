import { PartialType } from '@nestjs/swagger';
import { CreateWebsocketDto } from '../../../dto/create-websocket.dto';

export class SetWebsocketResponseDto extends PartialType(CreateWebsocketDto) {}


