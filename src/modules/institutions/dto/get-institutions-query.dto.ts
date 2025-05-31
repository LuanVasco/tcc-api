import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  MaxLength,
  IsIn,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetInstitutionsQueryDto {
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 1000,
    default: 100,
    example: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  page_size?: number = 100;

  @ApiPropertyOptional({ minimum: 1, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ maxLength: 30, example: 'Erebor Bank' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  display_name?: string;

  @ApiPropertyOptional({ pattern: '^[A-Z]{2}$', example: 'BR' })
  @IsOptional()
  @Matches(/^[A-Z]{2}$/)
  country_code?: string;

  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 40,
    example: 'planet_mx_retail',
  })
  @IsOptional()
  @Matches(/^[a-z_]{1,40}$/)
  name?: string;

  @ApiPropertyOptional({ enum: ['healthy', 'down'], example: 'healthy' })
  @IsOptional()
  @IsIn(['healthy', 'down'])
  status?: string;

  @ApiPropertyOptional({
    enum: ['bank', 'fiscal', 'employment'],
    example: 'fiscal',
  })
  @IsOptional()
  @IsIn(['bank', 'fiscal', 'employment'])
  type?: string;
}
