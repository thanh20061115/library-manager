import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BorrowRecordsService } from './borrow-records.service';
import { CreateBorrowRecordDto } from './dto/create-borrow-record.dto';
import { UpdateBorrowRecordDto } from './dto/update-borrow-record.dto';

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
  findAll() {
    return this.borrowRecordsService.findAll();
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowRecordsService.remove(Number(id));
  }
}