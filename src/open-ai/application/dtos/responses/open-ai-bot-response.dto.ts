import { IsBoolean, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class OpenAiBotResponseDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsBoolean()
  enabled: boolean;

  @IsString()
  openaiCredsId: string;

  @IsString()
  botType: string;

  @IsString()
  assistantId: string;

  @IsString()
  functionUrl: string;

  @IsString()
  model: string;

  @IsArray()
  @IsString({ each: true })
  systemMessages: string[];

  @IsArray()
  @IsString({ each: true })
  assistantMessages: string[];

  @IsArray()
  @IsString({ each: true })
  userMessages: string[];

  @IsNumber()
  maxTokens: number;

  @IsString()
  triggerType: string;

  @IsString()
  triggerOperator: string;

  @IsString()
  triggerValue: string;

  @IsNumber()
  expire: number;

  @IsString()
  keywordFinish: string;

  @IsNumber()
  delayMessage: number;

  @IsString()
  unknownMessage: string;

  @IsBoolean()
  listeningFromMe: boolean;

  @IsBoolean()
  stopBotFromMe: boolean;

  @IsBoolean()
  keepOpen: boolean;

  @IsNumber()
  debounceTime: number;

  @IsArray()
  @IsString({ each: true })
  ignoreJids: string[];

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  @IsOptional()
  updatedAt?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
