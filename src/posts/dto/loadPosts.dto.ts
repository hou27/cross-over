import { OmitType } from '@nestjs/mapped-types';
import { Post } from '../entities/post.entity';

export class LoadPostsRes extends OmitType(Post, ['writer']) {
  isMine!: boolean;
}
