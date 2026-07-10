import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Reader } from './entities/reader.entity';
import { BorrowRecord } from '../borrow-records/entities/borrow-record.entity';

import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';

@Injectable()
export class ReadersService {
  constructor(
    @InjectRepository(Reader)
    private readonly readerRepo: Repository<Reader>,

    @InjectRepository(BorrowRecord)
    private readonly borrowRepo: Repository<BorrowRecord>,
  ) {}

  // Thêm độc giả
  async create(createReaderDto: CreateReaderDto): Promise<Reader> {
    const reader = this.readerRepo.create(createReaderDto);
    return await this.readerRepo.save(reader);
  }

  // Danh sách độc giả + Search + Pagination
  async findAll(
    page = 1,
    limit = 10,
    keyword = '',
  ): Promise<{
    data: Reader[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [data, total] = await this.readerRepo.findAndCount({
      where: [
        {
          fullName: Like(`%${keyword}%`),
        },
        {
          email: Like(`%${keyword}%`),
        },
        {
          phone: Like(`%${keyword}%`),
        },
      ],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  // Chi tiết độc giả
  async findOne(id: number): Promise<Reader> {
    const reader = await this.readerRepo.findOne({
      where: { id },
    });

    if (!reader) {
      throw new NotFoundException(
        `Reader with ID ${id} not found`,
      );
    }

    return reader;
  }

  // Cập nhật độc giả
  async update(
    id: number,
    updateReaderDto: UpdateReaderDto,
  ): Promise<Reader> {
    const reader = await this.findOne(id);

    Object.assign(reader, updateReaderDto);

    return await this.readerRepo.save(reader);
  }

  // Xóa độc giả
  async remove(id: number) {
    const reader = await this.findOne(id);

    const borrowing = await this.borrowRepo.count({
      where: {
        reader: {
          id,
        },
        status: 'BORROWED',
      },
    });

    if (borrowing > 0) {
      throw new BadRequestException(
        'Cannot delete this reader because they are currently borrowing books.',
      );
    }

    await this.readerRepo.remove(reader);

    return {
      message: 'Reader deleted successfully',
    };
  }

  async getBorrowHistory(id: number) {
  await this.findOne(id);

  return await this.borrowRepo.find({
    where: {
      reader: {
        id,
      },
    },
    relations: ['book'],
    order: {
      borrowDate: 'DESC',
    },
  });
 }
}