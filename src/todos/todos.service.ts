import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/database/prismaService';
import { CreateTodo } from './dto/CreateTodo.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateTodo } from './dto/updateTodo.dto';


@Injectable()
export class TodosService {

  constructor(private prisma: PrismaService) {}

  async create(user: User, createDto: CreateTodo, response: Response) {
    try{

      const verifyTodo = await this.prisma.todo.findMany({
        where: {
          Description: createDto.Description,
          authorId: user.id,
        },
      });

      if(verifyTodo.length > 0){
        response.status(401).json('Todo already exists');
        return;
      }
      const createTodo = await this.prisma.todo.create({
        data:{
          Description: createDto.Description,
          published: true,
          authorId: user.id,
        }
      })

      if(createTodo){
        return response.status(200).json(createTodo.Description);
      }
        return response.status(401).json('não cadastrado');
    }catch(error){    
      console.log(error)
    }
  }

  async findAll(user: User, response: Response) {
    try{
    const findTodo = await this.prisma.todo.findMany({
      select:{
        Description: true,
      },
      where:{
        authorId: user.id,
        published: true,
      },
    })
    if(findTodo.length == 0){
      return response.status(200).json(`You don't have any Todo`);
    }

    return response.status(200).jsonp(findTodo);
  }catch(error){
    console.log(error);
  };
}

  async findOne(user: User, id: number, response: Response) {

    const convId = Number(id);
    const findTodoById = await this.prisma.todo.findUnique({
      select:{
        Description: true
      },
      where:{
        authorId: user.id,
        id: convId
      },
    })
    if(!findTodoById){
      return response.status(401).json(`Todo didn't found`)
    }
      return response.status(200).jsonp(findTodoById);

  }
  
  async update(user: User, idTodo: number, updateTodo: UpdateTodo, response: Response) {
    try {

      const convertId = Number(idTodo);
      // Check if the Todo belongs to the user
      const verify = await this.prisma.todo.findUnique({
        where: {
          authorId: user.id,
          id: convertId
        },
      });
  
      if (verify) {
        // Update the Todo
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
        // Return a response to the client indicating that the Todo was not found
        response.status(404).json({ message: 'Todo not found or does not belong to the user' });
      }
    } catch (error) {
      // Handle errors during the update
      console.error('Error during Todo update:', error);
      // Return a response to the client indicating an internal server error
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  async remove(id: number) {
    await this.prisma.todo.delete({
      where:{
        id: id,
      },
    })
  }
}
