import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../books/entities/book.entity';
import { Reader } from '../readers/entities/reader.entity';
import { BorrowRecord } from '../borrow-records/entities/borrow-record.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,

    @InjectRepository(Reader)
    private readonly readerRepo: Repository<Reader>,

    @InjectRepository(BorrowRecord)
    private readonly borrowRepo: Repository<BorrowRecord>,
  ) {}

  async getStatistics() {
    const totalBooks = await this.bookRepo.count();

    const totalReaders = await this.readerRepo.count();

    const totalBorrowRecords = await this.borrowRepo.count();

    const borrowing = await this.borrowRepo.count({
      where: {
        status: 'BORROWED',
      },
    });

    const returned = await this.borrowRepo.count({
      where: {
        status: 'RETURNED',
      },
    });

    const books = await this.bookRepo.find();

    const availableBooks = books.reduce(
      (sum, book) => sum + book.available,
      0,
    );

    return {
      totalBooks,
      totalReaders,
      totalBorrowRecords,
      borrowing,
      returned,
      availableBooks,
    };
  }
}