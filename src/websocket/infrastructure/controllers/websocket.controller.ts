import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebsocketService } from '../../application/services/websocket.service';
import { CreateWebsocketDto } from '../../application/dtos/create-websocket.dto';

@ApiTags('EvolutionApi')
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
