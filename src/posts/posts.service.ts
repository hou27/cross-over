import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreatePostReqDto } from './dto/createPost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(
    userId: string,
    { title, content }: CreatePostReqDto,
  ): Promise<Post> {
    if (!userId) {
      throw new UnauthorizedException('Login Needed');
    }

    const user = await this.usersRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }

    return await this.postsRepository.save(
      this.postsRepository.create({
        title,
        content,
        writer: user,
      }),
    );
  }

  async load(page: number, limit: number): Promise<Post[]> {
    const posts = await this.postsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return posts;
  }

  async detail(postId: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post;
  }

  async delete(postId: number): Promise<void> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    await this.postsRepository.delete(postId);
    return;
  }
}
