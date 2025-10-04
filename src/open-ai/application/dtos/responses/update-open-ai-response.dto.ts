import { IsBoolean, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateOpenAiResponseDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsString()
  @IsOptional()
  openaiCredsId?: string;

  @IsString()
  @IsOptional()
  botType?: string;

  @IsString()
  @IsOptional()
  assistantId?: string;

  @IsString()
  @IsOptional()
  functionUrl?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  systemMessages?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  assistantMessages?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  userMessages?: string[];

  @IsNumber()
  @IsOptional()
  maxTokens?: number;

  @IsString()
  @IsOptional()
  triggerType?: string;

  @IsString()
  @IsOptional()
  triggerOperator?: string;

  @IsString()
  @IsOptional()
  triggerValue?: string;

  @IsNumber()
  @IsOptional()
  expire?: number;

  @IsString()
  @IsOptional()
  keywordFinish?: string;

  @IsNumber()
  @IsOptional()
  delayMessage?: number;

  @IsString()
  @IsOptional()
  unknownMessage?: string;

  @IsBoolean()
  @IsOptional()
  listeningFromMe?: boolean;

  @IsBoolean()
  @IsOptional()
  stopBotFromMe?: boolean;

  @IsBoolean()
  @IsOptional()
  keepOpen?: boolean;

  @IsNumber()
  @IsOptional()
  debounceTime?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ignoreJids?: string[];

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
