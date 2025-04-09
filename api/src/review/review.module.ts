import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ReviewService, PrismaService],
  controllers: [ReviewController]
})
export class ReviewModule {}
