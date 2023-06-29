import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PostsService } from './posts.service';
import { CreatePostReqDto } from './dto/createPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async load(
    @AuthUser() { userId }: User,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.postsService.load(userId, page, limit);
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    return this.postsService.detail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @AuthUser() { userId }: User,
    @Body() createPostReq: CreatePostReqDto,
  ) {
    return this.postsService.create(userId, createPostReq);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@AuthUser() { userId }: User, @Param('id') postId: string) {
    return this.postsService.delete(userId, postId);
  }
}
