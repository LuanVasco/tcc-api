import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() body) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { body };
  }

  @Get()
  list() {
    return { users: [] };
  }

  @Get(':id')
  findUser(@Param() params) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { user: {}, params };
  }

  @Put(':id')
  updateUser(@Body() body, @Param() params) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { body, params };
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { params };
  }
}
