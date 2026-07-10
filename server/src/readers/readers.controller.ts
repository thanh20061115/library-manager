import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

import { ReadersService } from './readers.service';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';

@Controller('readers')
export class ReadersController {
  constructor(
    private readonly readersService: ReadersService,
  ) {}

  // Thêm độc giả
  @Post()
  create(@Body() createReaderDto: CreateReaderDto) {
    return this.readersService.create(createReaderDto);
  }

  // Danh sách + Search + Pagination
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('keyword') keyword = '',
  ) {
    return this.readersService.findAll(
      Number(page),
      Number(limit),
      keyword,
    );
  }

  // Chi tiết độc giả
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readersService.findOne(+id);
  }

  @Get(':id/history')
getBorrowHistory(@Param('id') id: string) {
  return this.readersService.getBorrowHistory(+id);
  }

  // Cập nhật độc giả
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReaderDto: UpdateReaderDto,
  ) {
    return this.readersService.update(
      +id,
      updateReaderDto,
    );
  }

  // Xóa độc giả
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readersService.remove(+id);
  }
}