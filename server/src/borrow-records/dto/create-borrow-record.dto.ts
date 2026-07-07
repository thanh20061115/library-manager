import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBorrowRecordDto {
  @IsInt()
  bookId: number;

  @IsInt()
  readerId: number;

  @IsDateString()
  borrowDate: string;

  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @IsOptional()
  @IsString()
  status?: string;
}