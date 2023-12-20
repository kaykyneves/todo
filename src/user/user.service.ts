import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaClient){}

  async create(createUserDto: CreateUserDto, response: Response) {

    const FindEmail = await this.prisma.user.findUnique({
      where:{
        email: createUserDto.email,
      },
    })

    if(FindEmail !== null){
      return response.status(401).json('email already exists')
    }

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }

    const userCreated = await this.prisma.user.create({ data});

    return response.json({
      ...userCreated,
      password: undefined
    })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where:{ email }
    })
  }
}
