import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssistantsModule } from './assistants/assistants.module';
import { CallsModule } from './calls/calls.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { PhoneNumbersModule } from './phone-numbers/phone-numbers.module';
import { ToolsModule } from './tools/tools.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InstanceModule } from './instances/instance.module';
import { WebhookModule } from './webhook/webhook.module';
import { SendMessageModule } from './send-message/send-message.module';
import { ChatControllerModule } from './chat-controller/chat-controller.module';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { ChatwootModule } from './chatwoot/chatwoot.module';
import { WebsocketModule } from './websocket/websocket.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InstanceModule,
    WebhookModule,
    SendMessageModule,
    ChatControllerModule,
    OpenAiModule,
    ProfileSettingsModule,
    ToolsModule,
    AnalyticsModule,
    PhoneNumbersModule,
    AssistantsModule,
    CallsModule,
    CampaignsModule,
    ChatwootModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}