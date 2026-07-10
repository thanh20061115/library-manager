import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { Book } from '../books/entities/book.entity';
import { Reader } from '../readers/entities/reader.entity';
import { BorrowRecord } from '../borrow-records/entities/borrow-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      Reader,
      BorrowRecord,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}