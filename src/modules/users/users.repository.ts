import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as types from 'src/utils/types';
import { prisma } from 'src/utils';

@Injectable()
export class UsersRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  async checkEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async checkUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
  async findUserById(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
  }

  async createNewUser(params: types.CreateNewUser) {
    await this.prisma.user.create({
      data: {
        email: params.email,
        username: params.username,
        password: params.hashedPassword,
      },
    });
  }

  async findUser(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        username: true,
        user_id: true,
        avatar: true,
      },
    });
  }
  async getUsersList(userId: string) {
    return await this.prisma.user.findMany({
      select: {
        user_id: true,
        username: true,
        avatar: true,
      },
      where: {
        user_id: {
          not: userId,
        },
      },
    });
  }
  async findNewPossibleFriends(excludedUsers: string[]) {
    return await this.prisma.user.findMany({
      select: {
        user_id: true,
        username: true,
        avatar: true,
      },
      where: {
        user_id: {
          notIn: excludedUsers,
        },
      },
    });
  }

  async changePassword(params: types.ChangePassword) {
    await this.prisma.user.update({
      where: {
        user_id: params.userId,
      },
      data: {
        password: params.newHashedPassword,
      },
    });
  }
  async deleteAccount(userId: string) {
    await this.prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
  }
}
