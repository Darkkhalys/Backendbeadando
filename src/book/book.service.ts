import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.modul';

export type CreateBookInput = Omit<Book, 'id'>;
@Injectable()
export class BookService {
  private readonly books: Book[] = [];

  getBooks() {
    return this.books;
  }

  createBooks(bookInput: CreateBookInput) {
    let todoid: number;
    if (this.books.length === 0) {
      todoid = 1;
    } else {
      todoid = this.books.length + 1;
    }
    const books = { ...bookInput, id: todoid.toString() };
    this.books.push(books);
    return books;
  }
  getBook(bookSearch: string) {
    for (const book1 of this.books) {
      if (book1.id === bookSearch) {
        return book1;
      }
    }
    return undefined;
  }
  deleteBook(id: string) {
    const index = this.books.findIndex((book) => book.id === id);
    console.log(index);
    if (index === undefined) {
      return;
    }
    this.books.splice(index, 1);
    return this.books;
  }
  updateBook(id: string, updateinput: CreateBookInput) {
    for (const book of this.books) {
      if (book.id === id) {
        book.cim = updateinput.cim;
        book.szerzo = updateinput.szerzo;
        book.kiadaseve = updateinput.kiadaseve;
        return book;
      }
    }
    throw new NotFoundException();
  }
}
