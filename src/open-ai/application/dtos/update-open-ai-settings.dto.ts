import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateOpenAiSettingsDto {
  @IsString()
  @IsOptional()
  remoteJid?: string;

  @IsString()
  @IsOptional()
  @IsIn(['opened', 'closed', 'paused', 'active', 'inactive'])
  status?: string;
}
