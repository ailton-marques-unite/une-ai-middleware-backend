import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssistantsModule } from './assistants/assistants.module';
import { CallsModule } from './calls/calls.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AssistantsModule,
    CallsModule,
    CampaignsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}