import { Module } from '@nestjs/common';
import { WebsocketService } from './application/services/websocket.service';
import { WebsocketController } from './infrastructure/controllers/websocket.controller';
import { HttpModule } from '@nestjs/axios';
import { WebsocketRepository } from './infrastructure/repositories/websocket.repository';

@Module({
  imports: [HttpModule],
  controllers: [WebsocketController],
  providers: [WebsocketService, WebsocketRepository],
})
export class WebsocketModule {}
