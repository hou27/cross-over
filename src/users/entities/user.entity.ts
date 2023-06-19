import { IsDate, IsEmail, IsString, Matches } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  @Matches(/^[A-Za-z\d]{5, 10}$/, {
    message: 'userId must be at least 5 characters long, contain 1 number',
  })
  userId!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column({ select: false })
  @IsString()
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_\-+=`|\(){}[\]:;"'<>,.?/])(?=.*[0-9]).{8,15}$/,
    {
      message:
        'Password must be at least 8 characters long, contain 1 number, 1 special character',
    },
  )
  password!: string;

  @Column()
  @IsDate()
  agreementAt!: Date;

  @OneToMany(() => Post, (post) => post.writer, { nullable: true })
  posts?: Post[];
}
