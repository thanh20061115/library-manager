import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Book } from './entities/book.entity';
import { BorrowRecord } from '../borrow-records/entities/borrow-record.entity';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,

    @InjectRepository(BorrowRecord)
    private readonly borrowRepo: Repository<BorrowRecord>,
  ) {}

  // Thêm sách
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepo.create(createBookDto);
    return await this.bookRepo.save(book);
  }

  // Lấy danh sách sách
async findAll(
  page = 1,
  limit = 10,
  keyword = '',
  category = '',
  author = '',
  sort = 'DESC',
): Promise<{
  data: Book[];
  total: number;
  page: number;
  limit: number;
}> {
  const query = this.bookRepo.createQueryBuilder('book');

  if (keyword) {
    query.andWhere(
      '(book.title LIKE :keyword OR book.author LIKE :keyword)',
      {
        keyword: `%${keyword}%`,
      },
    );
  }

  if (category) {
    query.andWhere('book.category = :category', {
      category,
    });
  }

  if (author) {
    query.andWhere('book.author LIKE :author', {
      author: `%${author}%`,
    });
  }

  query.orderBy('book.id', sort === 'ASC' ? 'ASC' : 'DESC');

  query.skip((page - 1) * limit);

  query.take(limit);

  const [data, total] = await query.getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
  };
}

  // Lấy chi tiết sách
  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepo.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  // Cập nhật sách
  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.findOne(id);

    Object.assign(book, updateBookDto);

    return await this.bookRepo.save(book);
  }

  // Xóa sách
  async remove(id: number) {
    const book = await this.findOne(id);

    const borrowing = await this.borrowRepo.count({
      where: {
        book: {
          id,
        },
        status: 'BORROWED',
      },
    });

    if (borrowing > 0) {
      throw new BadRequestException(
        'Cannot delete this book because it is currently borrowed.',
      );
    }

    await this.bookRepo.remove(book);

    return {
      message: 'Book deleted successfully',
    };
  }

  async getBorrowHistory(id: number) {
  await this.findOne(id);

  return await this.borrowRepo.find({
    where: {
      book: {
        id,
      },
    },
    relations: ['reader'],
    order: {
      borrowDate: 'DESC',
    },
  });
 }
}