import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
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
    // page가 1보다 작으면 1로 설정
    if (page < 1) {
      page = 1;
    }
    const posts = await this.postsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return posts;
  }

  async detail(postId: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post;
  }

  async delete(userId: string, postId: string): Promise<void> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: {
        writer: true,
      },
    });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }
    if (post.writer.userId !== userId) {
      throw new ForbiddenException('Not Your Post');
    }

    await this.postsRepository.delete(postId);
    return;
  }
}
