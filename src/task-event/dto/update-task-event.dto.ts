import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskEventDto } from './create-task-event.dto';

export class UpdateTaskEventDto extends PartialType(CreateTaskEventDto) {}
