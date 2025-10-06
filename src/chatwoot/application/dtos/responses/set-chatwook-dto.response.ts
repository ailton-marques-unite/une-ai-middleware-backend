import { PartialType } from '@nestjs/swagger';
import { CreateChatwootDto } from '../create-chatwoot.dto';

export class SetChatwookDtoResponse extends PartialType(CreateChatwootDto) {}


