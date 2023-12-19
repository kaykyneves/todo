import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateTodo } from './dto/CreateTodo.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';


@Controller()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('/createTodo')
  create(@CurrentUser() user: User, @Body() createDto: CreateTodo, @Res() response: Response) {

    return this.todosService.create(user, createDto, response);
  }
}
