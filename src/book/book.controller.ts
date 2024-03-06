import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService, CreateBookInput } from './book.service';

@Controller('/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Get('/:num')
  getBook(@Param('num') id: string) {
    return this.bookService.getBook(id);
  }
  @Post('/create')
  createBooks(@Body() book: CreateBookInput) {
    return this.bookService.createBooks(book);
  }
  @Put('/update/:id')
  updateBook(@Param('id') id: string, @Body() bookupdate: CreateBookInput) {
    return this.bookService.updateBook(id, bookupdate);
  }
  @Delete('/delete/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
