import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 5;

  @IsOptional()
  @IsString()
  sort?: string;
  @IsOptional()
  @IsString()
  search?: string;
}
