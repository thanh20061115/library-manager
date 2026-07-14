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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

@Get()
findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('keyword') keyword = '',
  @Query('category') category = '',
  @Query('author') author = '',
  @Query('sort') sort = 'DESC',
) {
  return this.booksService.findAll(
    Number(page),
    Number(limit),
    keyword,
    category,
    author,
    sort,
  );
}

@Get('all')
findAllBooks() {
  return this.booksService.findAllBooks();
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  @Get(':id/history')
getBorrowHistory(@Param('id') id: string) {
  return this.booksService.getBorrowHistory(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(Number(id), updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(Number(id));
  }
}