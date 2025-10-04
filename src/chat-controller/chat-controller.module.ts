import { Module } from '@nestjs/common';
import { ChatControllerService } from './application/services/chat-controller.service';
import { ChatControllerController } from './infrastructure/controllers/chat-controller.controller';
import { ChatControllerRepository } from './infrastructure/repositories/chat-controller.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ChatControllerController],
  providers: [ChatControllerService, ChatControllerRepository],
})
export class ChatControllerModule {}
