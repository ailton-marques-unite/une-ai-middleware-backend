import { PartialType } from '@nestjs/swagger';
import { CreateChatwootDto } from './create-chatwoot.dto';

export class UpdateChatwootDto extends PartialType(CreateChatwootDto) {}
