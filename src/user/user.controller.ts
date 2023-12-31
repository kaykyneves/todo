import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
    @Post()
    create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
      return this.userService.create(createUserDto, response);
    }

    @Get('/get')
    get(@CurrentUser() user: User){
      return user;
    }

  
}