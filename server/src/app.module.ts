import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ReadersModule } from './readers/readers.module';
import { BorrowRecordsModule } from './borrow-records/borrow-records.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [BooksModule, ReadersModule, BorrowRecordsModule, AuthModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
