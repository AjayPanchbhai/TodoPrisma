import { PrismaClient } from '@prisma/client';
import { CreateTodoInput, UpdateTodoInput } from '../types';

const prisma = new PrismaClient();

export class TodoService {
    // Get all todos
    async getAllTodos() {
        return await prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // Get single todo by ID
    async getTodoById(id: number) {
        return await prisma.todo.findUnique({
            where: { id },
        });
    }

    // Create new todo
    async createTodo(data: CreateTodoInput) {
        if (!data.title || data.title.trim() === '') {
            throw new Error('Title is required');
        }

        return await prisma.todo.create({
            data: {
                title: data.title.trim(),
                description: data.description?.trim(),
                completed: data.completed || false,
            },
        });
    }

    // Update todo
    async updateTodo(id: number, data: UpdateTodoInput) {
        const todo = await this.getTodoById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }

        return await prisma.todo.update({
            where: { id },
            data: {
                title: data.title?.trim(),
                description: data.description?.trim(),
                completed: data.completed,
            },
        });
    }

    // Delete todo
    async deleteTodo(id: number) {
        const todo = await this.getTodoById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }

        return await prisma.todo.delete({
            where: { id },
        });
    }
}

export default new TodoService();