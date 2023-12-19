import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  import { AuthRequest } from './models/AuthRequest';
  import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
  
  @Controller()
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {
      return this.authService.login(req.user);
    }

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Get('/get')
    get(@CurrentUser() user: User){
      return user;
    }
  }