import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksModule } from './books/books.module';
import { ReadersModule } from './readers/readers.module';
import { BorrowRecordsModule } from './borrow-records/borrow-records.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'library_management',
      autoLoadEntities: true,
      synchronize: true,
    }),

    BooksModule,
    ReadersModule,
    BorrowRecordsModule,
    AuthModule,
    DashboardModule,
  ],
})
export class AppModule {}