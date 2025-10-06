import { PartialType } from '@nestjs/swagger';
import { CreateWebsocketDto } from '../create-websocket.dto';

export class SetWebsocketResponseDto extends PartialType(CreateWebsocketDto) {}


