import {
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
  ArrayMinSize,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateVoteDto {
  @IsUUID()
  pollId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  optionIds: string[];

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  voterName?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
