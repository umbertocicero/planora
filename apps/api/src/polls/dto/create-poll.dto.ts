import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
  MinLength,
  MaxLength,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreatePollOptionDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  text?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;
}

export class CreatePollDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsEnum(['single_choice', 'multiple_choice', 'calendar'])
  pollType: 'single_choice' | 'multiple_choice' | 'calendar';

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreatePollOptionDto)
  options: CreatePollOptionDto[];

  @IsOptional()
  @IsBoolean()
  allowAnonymous?: boolean;

  @IsOptional()
  @IsBoolean()
  requireName?: boolean;

  @IsOptional()
  @IsBoolean()
  allowMultipleVotes?: boolean;

  @IsOptional()
  @IsBoolean()
  showResultsBeforeVote?: boolean;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  password?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  minSelections?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxSelections?: number;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}
