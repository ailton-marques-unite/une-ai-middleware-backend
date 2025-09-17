import { IsOptional, IsNumber, IsDateString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ListAssistantsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  limit?: number = 100;

  @IsOptional()
  @IsDateString()
  createdAtGt?: string;

  @IsOptional()
  @IsDateString()
  createdAtLt?: string;

  @IsOptional()
  @IsDateString()
  createdAtGe?: string;

  @IsOptional()
  @IsDateString()
  createdAtLe?: string;

  @IsOptional()
  @IsDateString()
  updatedAtGt?: string;

  @IsOptional()
  @IsDateString()
  updatedAtLt?: string;

  @IsOptional()
  @IsDateString()
  updatedAtGe?: string;

  @IsOptional()
  @IsDateString()
  updatedAtLe?: string;
}
