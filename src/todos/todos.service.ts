import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/database/prismaService';
import { CreateTodo } from './dto/CreateTodo.dto';
import { User } from 'src/user/entities/user.entity';


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
  /*
  async update(id: number, updateTodo: UpdateTodoDto) {
    console.log('upTodoDto:', updateTodo); // Adicione este log
  
    try {
      const upTodo = await this.prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          Description: updateTodo.Description,
          published: updateTodo.published,
        },
      });
  
      return upTodo;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar o recurso.');
    }
  }
  */
  

  async remove(id: number) {
    await this.prisma.todo.delete({
      where:{
        id: id,
      },
    })
  }
}
