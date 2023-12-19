import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateTodo } from './dto/CreateTodo.dto';


@Controller()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/create')
  create(@Body() createDto: CreateTodo, @Res() response: Response) {

    return this.todosService.create(createDto, response);
  }
}
