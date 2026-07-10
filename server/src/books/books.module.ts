import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

import { Book } from './entities/book.entity';
import { BorrowRecord } from '../borrow-records/entities/borrow-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      BorrowRecord,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}