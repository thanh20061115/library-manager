import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BorrowRecord } from './entities/borrow-record.entity';
import { Book } from '../books/entities/book.entity';
import { Reader } from '../readers/entities/reader.entity';

import { CreateBorrowRecordDto } from './dto/create-borrow-record.dto';
import { UpdateBorrowRecordDto } from './dto/update-borrow-record.dto';

@Injectable()
export class BorrowRecordsService {
  constructor(
    @InjectRepository(BorrowRecord)
    private readonly borrowRecordRepo: Repository<BorrowRecord>,

    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,

    @InjectRepository(Reader)
    private readonly readerRepo: Repository<Reader>,
  ) {}

  // Thêm phiếu mượn
  async create(
    createBorrowRecordDto: CreateBorrowRecordDto,
  ): Promise<BorrowRecord> {
    const book = await this.bookRepo.findOne({
      where: { id: createBorrowRecordDto.bookId },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const reader = await this.readerRepo.findOne({
      where: { id: createBorrowRecordDto.readerId },
    });

    if (!reader) {
      throw new NotFoundException('Reader not found');
    }

    if (book.available <= 0) {
      throw new BadRequestException('Book is out of stock');
    }

    book.available--;
    await this.bookRepo.save(book);

    const borrowRecord = this.borrowRecordRepo.create({
      book,
      reader,
      borrowDate: createBorrowRecordDto.borrowDate,
      dueDate: createBorrowRecordDto.dueDate,
      returnDate: createBorrowRecordDto.returnDate,
      status: createBorrowRecordDto.status || 'BORROWED',
    });

    return await this.borrowRecordRepo.save(borrowRecord);
  }

  // Danh sách phiếu mượn
async findAll(): Promise<BorrowRecord[]> {
  return await this.borrowRecordRepo.find({
    relations: ['book', 'reader'],
    order: {
      id: 'DESC',
    },
  });
}

  // Chi tiết phiếu mượn
async findOne(id: number): Promise<BorrowRecord> {
  const borrowRecord = await this.borrowRecordRepo.findOne({
    where: { id },
    relations: ['book', 'reader'],
  });

  if (!borrowRecord) {
    throw new NotFoundException(
      `Borrow record with ID ${id} not found`,
    );
  }

  return borrowRecord;
}

  // Cập nhật
  async update(
    id: number,
    updateBorrowRecordDto: UpdateBorrowRecordDto,
  ): Promise<BorrowRecord> {
    const borrowRecord = await this.findOne(id);

    Object.assign(borrowRecord, updateBorrowRecordDto);

    return await this.borrowRecordRepo.save(borrowRecord);
  }

async returnBook(id: number): Promise<BorrowRecord> {
  const borrowRecord = await this.findOne(id);

  if (borrowRecord.status === 'RETURNED') {
    throw new BadRequestException('Book has already been returned');
  }

  borrowRecord.status = 'RETURNED';
  borrowRecord.returnDate = new Date();

  borrowRecord.book.available++;

  await this.bookRepo.save(borrowRecord.book);

  return await this.borrowRecordRepo.save(borrowRecord);
}

  // Xóa
  async remove(id: number): Promise<void> {
    const borrowRecord = await this.findOne(id);

    await this.borrowRecordRepo.remove(borrowRecord);
  }
}