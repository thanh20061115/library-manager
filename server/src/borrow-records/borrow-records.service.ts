import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BorrowRecord } from './entities/borrow-record.entity';
import { CreateBorrowRecordDto } from './dto/create-borrow-record.dto';
import { UpdateBorrowRecordDto } from './dto/update-borrow-record.dto';

@Injectable()
export class BorrowRecordsService {
  constructor(
    @InjectRepository(BorrowRecord)
    private readonly borrowRecordRepo: Repository<BorrowRecord>,
  ) {}

  // Thêm phiếu mượn
  async create(
    createBorrowRecordDto: CreateBorrowRecordDto,
  ): Promise<BorrowRecord> {
    const borrowRecord = this.borrowRecordRepo.create(createBorrowRecordDto);
    return await this.borrowRecordRepo.save(borrowRecord);
  }

  // Lấy danh sách phiếu mượn
  async findAll(): Promise<BorrowRecord[]> {
    return await this.borrowRecordRepo.find();
  }

  // Lấy phiếu mượn theo ID
  async findOne(id: number): Promise<BorrowRecord> {
    const borrowRecord = await this.borrowRecordRepo.findOne({
      where: { id },
    });

    if (!borrowRecord) {
      throw new NotFoundException(`Borrow record with ID ${id} not found`);
    }

    return borrowRecord;
  }

  // Cập nhật phiếu mượn
  async update(
    id: number,
    updateBorrowRecordDto: UpdateBorrowRecordDto,
  ): Promise<BorrowRecord> {
    const borrowRecord = await this.findOne(id);

    Object.assign(borrowRecord, updateBorrowRecordDto);

    return await this.borrowRecordRepo.save(borrowRecord);
  }

  // Xóa phiếu mượn
  async remove(id: number): Promise<void> {
    const borrowRecord = await this.findOne(id);
    await this.borrowRecordRepo.remove(borrowRecord);
  }
}