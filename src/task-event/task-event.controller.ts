import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskEventService } from './task-event.service';
import { CreateTaskEventDto } from './dto/create-task-event.dto';
import { UpdateTaskEventDto } from './dto/update-task-event.dto';

@Controller('task-event')
export class TaskEventController {
  constructor(private readonly taskEventService: TaskEventService) {}

  @Post()
  create(@Body() createTaskEventDto: CreateTaskEventDto) {
    return this.taskEventService.create(createTaskEventDto);
  }

  @Get()
  findAll() {
    return this.taskEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskEventDto: UpdateTaskEventDto) {
    return this.taskEventService.update(+id, updateTaskEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskEventService.remove(+id);
  }
}
