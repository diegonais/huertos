import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';
import { Farm } from '../farms/entities/farm.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmsRepository: Repository<Farm>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const user = await this.usersRepository.findOneBy({ id: dto.createdById });
    const farm = await this.farmsRepository.findOneBy({ id: dto.farmId });

    const task = this.tasksRepository.create({ 
      title: dto.title,
      description: dto.description,
      taskType: dto.taskType,
      defaultIntervalDays: dto.defaultIntervalDays,
      createdBy: user,
      farm: farm
    });

    return this.tasksRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['createdBy', 'farm'] });
  }

  findOne(id: string): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id }, relations: ['createdBy', 'farm'] });
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
