import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebsocketService } from '../../application/services/websocket.service';
import { CreateWebsocketDto } from '../../dto/create-websocket.dto';

@Controller('websocket')
export class WebsocketController {
  constructor(private readonly websocketService: WebsocketService) {}

  @Get('/find/:instanceName')
  findByName(@Param('instanceName') instanceName: string) {
    return this.websocketService.findByName(instanceName);
  }

  @Post('/set/:instanceName')
  setWebsocket(@Param('instanceName') instanceName: string, @Body() createWebsocketDto: CreateWebsocketDto) {
    return this.websocketService.setWebsocket(instanceName, createWebsocketDto);
  }
}
