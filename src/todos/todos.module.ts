import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from 'src/database/prismaService';
import { BcryptService } from 'src/helper/bcrypt';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService, BcryptService],
})
export class TodosModule {}
