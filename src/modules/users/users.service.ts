import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '../../../generated/prisma';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async createUser(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    document?: string;
    birthday?: Date;
    cep?: string;
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    complement?: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        phone: data.phone,
        document: data.document,
        birthday: data.birthday,
        cep: data.cep,
        street: data.street,
        number: data.number,
        city: data.city,
        state: data.state,
        complement: data.complement,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async deleteById(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
