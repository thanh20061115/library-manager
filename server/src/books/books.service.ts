import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  // Thêm sách
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepo.create({
      ...createBookDto,
      available: createBookDto.available ?? createBookDto.quantity,
    });

    return await this.bookRepo.save(book);
  }

  // Lấy tất cả sách
  async findAll(): Promise<Book[]> {
    return await this.bookRepo.find();
  }

  // Lấy sách theo ID
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
  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);

    await this.bookRepo.remove(book);
  }
}