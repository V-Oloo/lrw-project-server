import { Comment } from './../models/comment.entity';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([Comment,CommentsRepository])
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
