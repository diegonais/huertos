import { Module } from '@nestjs/common';
import { TaskEventsService } from './task-events.service';
import { TaskEventsController } from './task-events.controller';

@Module({
  controllers: [TaskEventsController],
  providers: [TaskEventsService],
})
export class TaskEventsModule {}
