import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReadersController } from './readers.controller';
import { ReadersService } from './readers.service';

import { Reader } from './entities/reader.entity';
import { BorrowRecord } from '../borrow-records/entities/borrow-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reader,
      BorrowRecord,
    ]),
  ],
  controllers: [ReadersController],
  providers: [ReadersService],
  exports: [ReadersService],
})
export class ReadersModule {}