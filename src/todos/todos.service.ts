import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/database/prismaService';
import { CreateTodo } from './dto/CreateTodo.dto';


@Injectable()
export class TodosService {

  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateTodo, response: Response) {
    try{

      const verifyTodo = await this.prisma.todo.findMany({
        where: {
          Description: createDto.Description,
          authorId: createDto.authorId,
        },
      });

      if(verifyTodo.length > 0){
        response.status(401).json('Todo already exists');
        return;
      }
      const createTodo = await this.prisma.todo.create({
        data:{
          Description: createDto.Description,
          published: createDto.published,
          authorId: createDto.authorId,
        }
      })

      if(createTodo){
        return response.status(200).json(createTodo);
      }
        return response.status(401).json('não cadastrado');
    }catch(error){    
      console.log(error)
    }
  }

  async findAll(id: number, response: Response) {
    try{
    const findTodo = await this.prisma.todo.findMany({
      select:{
        Description: true,
      },
      where:{
        authorId: id,
        published: true,
      },
    })
    if(findTodo.length > 0){
      return response.status(200).json(`You don't have any Todo`);
    }

    return response.status(200).jsonp(findTodo);
  }catch(error){
    console.log(error);
  };
}

  async findOne(id: number, idTodo: number, response: Response) {
    const findTodoById = await this.prisma.todo.findUnique({
      select:{
        Description: true
      },
      where:{
        authorId: id,
        id: idTodo
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
