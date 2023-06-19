import { PickType } from '@nestjs/mapped-types';
import { Post } from '../entities/post.entity';

export class CreatePostReqDto extends PickType(Post, ['title', 'content']) {}
