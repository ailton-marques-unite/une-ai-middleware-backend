import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class WebsocketConfigDto {
  @ApiPropertyOptional({ description: 'Enable or disable websocket integration', example: true })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional({ description: 'List of websocket events to subscribe', example: ['APPLICATION_STARTUP'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  events?: string[];
}

export class CreateWebsocketDto {
  @ApiPropertyOptional({ description: 'Websocket configuration object', type: WebsocketConfigDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => WebsocketConfigDto)
  websocket?: WebsocketConfigDto;
}
