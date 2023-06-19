import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class LoginReqDto extends PickType(User, ['userId', 'password']) {}
