import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateAccountReqDto } from './dto/create-account.dto';
import { LoginReqDto } from './dto/login.dto';
import { TokenRes } from './dto/token.dto';
import { Payload } from './jwt/jwt.payload';
import { customJwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: customJwtService,
  ) {}

  async register({
    email,
    userId,
    password,
  }: CreateAccountReqDto): Promise<void> {
    try {
      // email 중복 확인
      const emailExists = await this.usersRepository.findOne({
        where: { email },
      });
      if (emailExists) {
        throw new BadRequestException('Email Already Exists');
      }

      // userId 중복 확인
      const userIdExists = await this.usersRepository.findOne({
        where: { userId },
      });
      if (userIdExists) {
        throw new BadRequestException('UserId Already Exists');
      }

      await this.usersRepository.save(
        this.usersRepository.create({
          userId,
          email,
          password,
          agreementAt: new Date(),
        }),
      );

      return;
    } catch (e) {
      throw e;
    }
  }

  async login({ userId, password }: LoginReqDto): Promise<TokenRes> {
    try {
      const user = await this.validateUser(userId, password);

      // payload 생성
      const payload: Payload = this.jwtService.createPayload(userId, user.id);

      // access token 생성 반환
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw e;
    }
  }

  async validateUser(userId: string, password: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { userId },
        select: { id: true, password: true },
      });
      if (!user) {
        throw new NotFoundException('User Not Found');
      }

      // TODO: password hashing
      if (password === user.password) {
        return user;
      } else {
        throw new BadRequestException('Wrong Password');
      }
    } catch (e) {
      throw e;
    }
  }
}
