import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './database/prismaService';

@Module({
  imports: [UserModule, AuthModule, TodosModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}


