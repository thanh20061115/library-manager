import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reader } from './entities/reader.entity';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';

@Injectable()
export class ReadersService {
  constructor(
    @InjectRepository(Reader)
    private readonly readerRepo: Repository<Reader>,
  ) {}

  // Thêm độc giả
  async create(createReaderDto: CreateReaderDto): Promise<Reader> {
    const reader = this.readerRepo.create(createReaderDto);
    return await this.readerRepo.save(reader);
  }

  // Lấy danh sách độc giả
  async findAll(): Promise<Reader[]> {
    return await this.readerRepo.find();
  }

  // Lấy độc giả theo ID
  async findOne(id: number): Promise<Reader> {
    const reader = await this.readerRepo.findOne({
      where: { id },
    });

    if (!reader) {
      throw new NotFoundException(`Reader with ID ${id} not found`);
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
  async remove(id: number): Promise<void> {
    const reader = await this.findOne(id);
    await this.readerRepo.remove(reader);
  }
}