import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Book } from '../../books/entities/book.entity';
import { Reader } from '../../readers/entities/reader.entity';

@Entity('borrow_records')
export class BorrowRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.borrowRecords, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Reader, (reader) => reader.borrowRecords, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'readerId' })
  reader: Reader;

  @Column({ type: 'date' })
  borrowDate: Date;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'date', nullable: true })
  returnDate: Date;

  @Column({
    default: 'BORROWED',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}