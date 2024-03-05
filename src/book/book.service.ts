import { Injectable } from '@nestjs/common';
import { Book } from './book.modul';

export type CreateBookInput = Omit<Book, 'kiadaseve'>;
@Injectable()
export class BookService {
  private readonly books: Book[] = [];

  getBooks() {
    return this.books;
  }

  createBooks(bookInput: Book) {
    const books = { ...bookInput };
    this.books.push(books);
    return books;
  }
  getBook(bookSearch: CreateBookInput) {
    for (const book1 of this.books) {
      if (book1.cim === bookSearch.cim && book1.szerzo === bookSearch.szerzo) {
        return book1;
      }
    }
    return undefined;
  }
  deleteBook(bookDelete: Book) {
    const index = this.books.findIndex((book) => book === bookDelete);
    console.log(index);
    if (index === -1) {
      return;
    }
    this.books.splice(index, 1);
    return this.books;
  }
}
