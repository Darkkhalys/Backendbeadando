import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should return an empty by default', () => {
    expect(service.getBooks()).toEqual([]);
  });

  it('should return a single book after create', () => {
    const createdBook = service.createBooks({
      cim: 'test',
      szerzo: 'test',
      kiadaseve: 2002,
    });
    const book = service.getBook(createdBook.id);
    expect(book).toEqual({
      cim: 'test',
      szerzo: 'test',
      kiadaseve: 2002,
      id: expect.any(String),
    });
  });

  it('should return undefined', () => {
    const book = service.getBook('-1');
    expect(book).toBeUndefined();
  });

  describe('create', () => {
    it('should return a single todo after create', () => {
      service.createBooks({
        szerzo: 'test',
        cim: 'test',
        kiadaseve: 2002,
      }); //act

      expect(service.getBooks()).toEqual([
        {
          szerzo: 'test',
          cim: 'test',
          kiadaseve: 2002,
          id: expect.any(String),
        },
      ]); //assert
    });
  });
  describe('delete', () => {
    it('should delete the existing todo', () => {
      service.createBooks({ cim: 'a', szerzo: 'test', kiadaseve: 2002 });
      const todoToDelete = service.createBooks({
        cim: 'b',
        szerzo: 'test',
        kiadaseve: 2002,
      });
      service.createBooks({ cim: 'c', szerzo: 'test', kiadaseve: 2002 });
      service.deleteBook(todoToDelete.id);

      expect(service.getBooks()).toEqual([
        { cim: 'a', szerzo: 'test', kiadaseve: 2002, id: expect.any(String) },
        { cim: 'c', szerzo: 'test', kiadaseve: 2002, id: expect.any(String) },
      ]);
    });

    it("should not delete anything if it todo doesn't exist", () => {
      service.createBooks({ cim: 'test', szerzo: 'test', kiadaseve: 13 });
      service.deleteBook('-1');

      expect(service.getBooks()).toEqual([
        { cim: 'test', szerzo: 'test', kiadaseve: 13, id: expect.any(String) },
      ]);
    });
  });
  describe('update', () => {
    it('should return updated todo after update', () => {
      const book = service.createBooks({
        cim: 'test',
        szerzo: 'test',
        kiadaseve: 2000,
      });
      service.updateBook(book.id, {
        cim: 'test2',
        szerzo: 'test',
        kiadaseve: 2000,
      });
      expect(service.getBook(book.id)).toEqual({
        cim: 'test2',
        szerzo: 'test',
        kiadaseve: 2000,
        id: book.id,
      });
    });
  });

  it('should return the updated todo with getTodo after update', () => {
    const book = service.createBooks({
      cim: 'test',
      szerzo: 'test',
      kiadaseve: 2002,
    });
    const newBook = service.updateBook(book.id, {
      szerzo: 'test2',
      cim: 'test2',
      kiadaseve: 2000,
    });
    expect(newBook).toEqual({
      id: book.id,
      szerzo: 'test2',
      cim: 'test2',
      kiadaseve: 2000,
    });
  });

  it('should return the updated todo after update', () => {
    expect(() => {
      service.updateBook('-1', {
        szerzo: 'test2',
        cim: 'test2',
        kiadaseve: 2000,
      });
    }).toThrow(NotFoundException);
  });
});
