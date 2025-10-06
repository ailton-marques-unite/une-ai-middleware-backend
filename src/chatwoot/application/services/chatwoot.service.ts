import { Injectable } from '@nestjs/common';
import { CreateChatwootDto } from '../dtos/create-chatwoot.dto';
import { UpdateChatwootDto } from '../dtos/update-chatwoot.dto';
import { ChatwootRepository } from '../../infrastructure/repositories/chatwoot.repository';

@Injectable()
export class ChatwootService {

  constructor(private readonly chatwootRepository: ChatwootRepository) {}
  
  findByName(instanceName: string) {
    return this.chatwootRepository.findByName(instanceName);
  }

  setChatwoot(instanceName: string, updateChatwootDto: UpdateChatwootDto) {
    return this.chatwootRepository.setChatwoot(instanceName, updateChatwootDto);
  }
}
