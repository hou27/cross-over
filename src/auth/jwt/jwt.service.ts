import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class customJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: Payload): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string, options?: JwtVerifyOptions): Payload {
    return this.jwtService.verify(token, { secret: options?.secret });
  }

  createPayload(email: string, sub: number): Payload {
    return { email, sub };
  }
}
