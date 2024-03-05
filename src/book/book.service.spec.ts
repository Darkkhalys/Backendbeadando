import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';

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
    const createBook = service.createBooks({
      cim: 'test',
      szerzo: 'test',
      kiadaseve: 2002,
    });
    const book = service.getBook({
      cim: createBook.cim,
      szerzo: createBook.szerzo,
    });
    expect(book).toEqual({
      cim: 'test',
      szerzo: 'test',
      kiadaseve: 2002,
    });
  });

  it('should return undefined', () => {
    const book = service.getBook({ cim: 'test', szerzo: 'test' });
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
        { szerzo: 'test', cim: 'test', kiadaseve: 2002 },
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
      service.deleteBook(todoToDelete);

      expect(service.getBooks()).toEqual([
        { cim: 'a', szerzo: 'test', kiadaseve: 2002 },
        { cim: 'c', szerzo: 'test', kiadaseve: 2002 },
      ]);
    });

    it("should not delete anything if it todo doesn't exist", () => {
      service.createBooks({ cim: 'test', szerzo: 'test', kiadaseve: 13 });
      service.deleteBook({ cim: 'test', szerzo: 'test', kiadaseve: -12 });

      expect(service.getBooks()).toEqual([
        { cim: 'test', szerzo: 'test', kiadaseve: 13 },
      ]);
    });
  });

  it('should ', () => {});
});
