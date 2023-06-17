import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Post extends CoreEntity {
  @Column()
  @IsNumber()
  title!: string;

  @Column()
  @IsString()
  content!: string;

  @ManyToOne(() => User, (user) => user.posts)
  writer!: User;
}
