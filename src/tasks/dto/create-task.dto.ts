import { IsNotEmpty, IsOptional, IsUUID, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  taskType?: string;

  @IsOptional()
  @IsNumber()
  defaultIntervalDays?: number;

  @IsNotEmpty()
  @IsUUID()
  farmId: string;

  @IsNotEmpty()
  @IsUUID()
  createdById: string;
}
