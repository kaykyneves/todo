import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/database/prismaService';
import { User } from 'src/user/entities/user.entity';
import { CreateTodo } from './dto/CreateTodo.dto';
import { UpdateTodo } from './dto/updateTodo.dto';
import * as cron from 'node-cron';

@Injectable()
export class TodosService {

  constructor(private prisma: PrismaService) {}

  private async deleteAllTodos() {
    try {
      // Delete all TODOs
      await this.prisma.todo.deleteMany({});
      console.log('Todos deleted successfully.');
    } catch (error) {
      console.error('Error deleting all TODOs:', error);
    }
  }

  // Function called at the beginning of the module (after initialization)
  onModuleInit() {
    // Schedule daily execution at midnight
    cron.schedule('0 0 * * *', async () => {
      // Call the function to delete all TODOs
      await this.deleteAllTodos();
    });
  }

  // Create a new TODO
  async create(user: User, createDto: CreateTodo, response: Response) {
    try {
      // Check if the TODO with the same description already exists for the user
      const verifyTodo = await this.prisma.todo.findMany({
        where: {
          Description: createDto.Description,
          authorId: user.id,
        },
      });

      if (verifyTodo.length > 0) {
        response.status(401).json('Todo already exists');
        return;
      }

      // Create a new TODO
      const createTodo = await this.prisma.todo.create({
        data: {
          Description: createDto.Description,
          published: true,
          authorId: user.id,
        },
        select: {
          id: true,
          Description: true,
          authorId: true,
        },
      });

      if (createTodo) {
        return response.status(200).json(createTodo);
      }
      return response.status(401).json('Not registered');
    } catch (error) {
      console.log(error);
    }
  }

  // Find all TODOs for a user
  async findAll(user: User, response: Response) {
    try {
      // Find all TODOs for the user
      const findTodo = await this.prisma.todo.findMany({
        select: {
          id: true,
          Description: true,
          authorId: true,
        },
        where: {
          authorId: user.id,
          published: true,
        },
      });

      if (findTodo.length === 0) {
        return response.status(200).json(`You don't have any Todo`);
      }

      return response.status(200).jsonp(findTodo);
    } catch (error) {
      console.log(error);
    }
  }

  // Find a specific TODO by ID for a user
  async findOne(user: User, id: number, response: Response) {
    const convId = Number(id);
    // Find TODO by ID for the user
    const findTodoById = await this.prisma.todo.findUnique({
      select: {
        id: true,
        Description: true,
        authorId: true,
      },
      where: {
        authorId: user.id,
        id: convId,
        published: true,
      },
    });

    if (!findTodoById) {
      return response.status(401).json(`Todo didn't found`);
    }
    return response.status(200).jsonp(findTodoById);
  }

  // Update a TODO
  async update(user: User, idTodo: number, updateTodo: UpdateTodo, response: Response) {
    try {
      const convertId = Number(idTodo);
      // Check if the TODO belongs to the user
      const verify = await this.prisma.todo.findUnique({
        where: {
          authorId: user.id,
          id: convertId,
        },
      });

      if (verify) {
        // Update the TODO
        const todoUpdate = await this.prisma.todo.update({
          where: {
            id: convertId,
          },
          data: {
            Description: updateTodo.Description,
          }
        });

        if (todoUpdate) {
          console.log(todoUpdate);
          // Return a response to the client if needed
          response.status(200).json({ message: 'Todo updated successfully' });
        }
      } else {
        // Return a response to the client indicating that the TODO was not found
        response.status(404).json({ message: 'Todo not found or does not belong to the user' });
      }
    } catch (error) {
      // Handle errors during the update
      console.error('Error during Todo update:', error);
      // Return a response to the client indicating an internal server error
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  // Mark a TODO as done
  async markDone(user: User, id: number, response: Response) {
    const convertId = Number(id);

    // Check if the TODO belongs to the user
    const verify = await this.prisma.todo.findMany({
      where: {
        authorId: user.id,
      },
      select: {
        id: true,
      },
    });

    const todoIds = verify.map(todo => todo.id);

    if (todoIds.includes(convertId)) {
      try {
        // Update the TODO to mark it as done
        await this.prisma.todo.update({
          where: {
            id: convertId,
          },
          data: {
            published: false,
          }
        });

        // Send success response
        return response.status(200).send('');
      } catch (error) {
        // Handle any potential error
        console.error('Error updating todo:', error);
        return response.status(500).json({
          message: 'Internal server error',
        });
      }
    } else {
      // Send unauthorized response if the TODO doesn't belong to the user
      return response.status(401).json('Unauthorized. Todo does not belong to the user.');
    }
  }
}
