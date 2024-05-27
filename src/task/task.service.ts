import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'Pending' | 'Close';
}

@Injectable()
export class TaskService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async createTask(title: string, description: string): Promise<Task> {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: 'Open',
    };
    await this.redis.hset('tasks', task.id, JSON.stringify(task));
    return task;
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.redis.hvals('tasks');
    return tasks.map((task) => JSON.parse(task));
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.redis.hget('tasks', id);
    return JSON.parse(task);
  }

  async updateTask(
    id: string,
    updates: Partial<Omit<Task, 'id'>>,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    const updatedTask = { ...task, ...updates };
    await this.redis.hset('tasks', id, JSON.stringify(updatedTask));
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    await this.redis.hdel('tasks', id);
  }
}
