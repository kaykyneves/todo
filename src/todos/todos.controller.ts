import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Response } from 'express';
import { CreateTodo } from './dto/CreateTodo.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UpdateTodo } from './dto/updateTodo.dto';


@Controller()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('/createTodo')
  create(@CurrentUser() user: User, @Body() createDto: CreateTodo, @Res() response: Response) {

    return this.todosService.create(user, createDto, response);
  }

  @Get('/findAll')
  @HttpCode(HttpStatus.OK)
  get(@CurrentUser() user: User, @Res() response: Response){
    return this.todosService.findAll(user, response)
  }

  @Get('/FindById/:id')
  getTodo(@CurrentUser() user: User, @Param('id') id, @Res() response: Response){
    return this.todosService.findOne(user, id, response)
  }

  @Patch('/updatetodo/:id')
  UpTodo(@CurrentUser() user: User, @Param('id') id, @Body() updateTodo: UpdateTodo, @Res() response: Response){
    return this.todosService.update(user, id, updateTodo, response)
  }
}
