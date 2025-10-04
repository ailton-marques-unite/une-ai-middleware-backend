import { IsBoolean, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateOpenAiCredentialsDto {
  @IsString()
  @IsOptional()
  openaiCredsId?: string;

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
  openaiIdFallback?: string;
}
