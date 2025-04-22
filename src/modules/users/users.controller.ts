import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() { email, name, password }: CreateUserDTO) {
    return { email, name, password };
  }

  @Get()
  list() {
    return { users: [] };
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  updateUser(
    @Body() { email, name }: PatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { email, name, id };
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
