import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
// import { Farm } from '../../farms/entities/farm.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'task_type', nullable: true })
  taskType: string;

  @Column({ name: 'default_interval_days', nullable: true })
  defaultIntervalDays: number;

  @ManyToOne(() => User)
  createdBy: User;

  @ManyToOne(() => Farm)
  farm: Farm;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
