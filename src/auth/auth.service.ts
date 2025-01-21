import { Prisma } from '@prisma/client';
import { UserService } from './../user/user.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async signin(
    params: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.user({ email: params.email });
    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch) throw new NotFoundException('Invalid credials.');

    const payload = { sub: user.id };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
