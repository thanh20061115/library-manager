import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { BorrowRecordsService } from './borrow-records.service';
import { CreateBorrowRecordDto } from './dto/create-borrow-record.dto';
import { UpdateBorrowRecordDto } from './dto/update-borrow-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('borrow-records')
export class BorrowRecordsController {
  constructor(
    private readonly borrowRecordsService: BorrowRecordsService,
  ) {}

  @Post()
  create(@Body() createBorrowRecordDto: CreateBorrowRecordDto) {
    return this.borrowRecordsService.create(createBorrowRecordDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status = '',
  ) {
    return this.borrowRecordsService.findAll(
      Number(page),
      Number(limit),
      status,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowRecordsService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBorrowRecordDto: UpdateBorrowRecordDto,
  ) {
    return this.borrowRecordsService.update(
      Number(id),
      updateBorrowRecordDto,
    );
  }

  @Patch(':id/return')
  returnBook(@Param('id') id: string) {
    return this.borrowRecordsService.returnBook(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowRecordsService.remove(Number(id));
  }
}