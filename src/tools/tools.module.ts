import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ToolController } from './infrastructure/controllers/tool.controller';
import { ToolService } from './application/services/tool.service';
import { ToolRepository } from './infrastructure/repositories/tool.repository';

@Module({
  imports: [HttpModule],
  controllers: [ToolController],
  providers: [ToolRepository, ToolService],
  exports: [ToolService, ToolRepository],
})
export class ToolsModule {}
