import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class CreateAccountReqDto extends PickType(User, [
  'email',
  'userId',
  'password',
]) {}
