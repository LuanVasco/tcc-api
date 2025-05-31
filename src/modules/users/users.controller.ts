import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(body.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    // converter birthday para Date se informado
    if (body.birthday) {
      body.birthday = new Date(body.birthday).toISOString();
    }

    const user = await this.usersService.createUser({
      ...body,
      birthday: body.birthday ? new Date(body.birthday) : undefined,
    });
    return { id: user.id, email: user.email, name: user.name };
  }

  @Get()
  async findAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteById(id);
  }
}
