import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BorrowRecordsController } from './borrow-records.controller';
import { BorrowRecordsService } from './borrow-records.service';
import { BorrowRecord } from './entities/borrow-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord])],
  controllers: [BorrowRecordsController],
  providers: [BorrowRecordsService],
  exports: [BorrowRecordsService],
})
export class BorrowRecordsModule {}