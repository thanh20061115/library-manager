import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BorrowRecordsController } from './borrow-records.controller';
import { BorrowRecordsService } from './borrow-records.service';

import { BorrowRecord } from './entities/borrow-record.entity';
import { Book } from '../books/entities/book.entity';
import { Reader } from '../readers/entities/reader.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BorrowRecord,
      Book,
      Reader,
    ]),
  ],
  controllers: [BorrowRecordsController],
  providers: [BorrowRecordsService],
})
export class BorrowRecordsModule {}