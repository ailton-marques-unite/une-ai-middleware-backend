import { Injectable } from '@nestjs/common';
import { CreateWebsocketDto } from '../../dto/create-websocket.dto';
import { WebsocketRepository } from '../../infrastructure/repositories/websocket.repository';

@Injectable()
export class WebsocketService {
  constructor(private readonly websocketRepository: WebsocketRepository) {}

  findByName(instanceName: string) {
    return this.websocketRepository.findByName(instanceName);
  }

  setWebsocket(instanceName: string, createWebsocketDto: CreateWebsocketDto) {
    return this.websocketRepository.setWebsocket(instanceName, createWebsocketDto);
  }
}
