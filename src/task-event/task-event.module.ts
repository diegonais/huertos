import { Module } from '@nestjs/common';
import { TaskEventService } from './task-event.service';
import { TaskEventController } from './task-event.controller';

@Module({
  controllers: [TaskEventController],
  providers: [TaskEventService],
})
export class TaskEventModule {}
