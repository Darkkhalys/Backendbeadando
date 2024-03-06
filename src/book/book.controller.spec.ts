import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService, CreateBookInput } from './book.service';

describe('KonyvController', () => {
  let controller: BookController;
  let mockBookService: BookService;

  beforeEach(async () => {
    mockBookService = {} as BookService;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookService);
  });

  it('should return the list of todos returned by todoService.getTodos()', () => {
    mockBookService.getBooks = () => [
      { id: '42', cim: 'test', szerzo: 'test', kiadaseve: 2002 },
    ];
    const books = controller.getBooks();
    expect(books).toEqual([
      { id: '42', cim: 'test', szerzo: 'test', kiadaseve: 2002 },
    ]);
  });

  it('should return the single todo returned by todoService.getTodos()', () => {
    mockBookService.getBook = (id: string) => {
      if (id === '42') {
        return { id: '42', cim: 'test', szerzo: 'test', kiadaseve: 2002 };
      }
    };
    const todo = controller.getBook('42');
    expect(todo).toEqual({
      id: '42',
      cim: 'test',
      szerzo: 'test',
      kiadaseve: 2002,
    });
  });

  it('should create, then return the created todo returned by todoService.createTodo()', () => {
    mockBookService.createBooks = (input: CreateBookInput) => ({
      id: '42',
      ...input,
    });
    const books = controller.createBooks({
      cim: 'test',
      szerzo: 'test',
      kiadaseve: 2002,
    });
    expect(books).toEqual({
      id: '42',
      cim: 'test',
      szerzo: 'test',
      kiadaseve: 2002,
    });
  });

  it('should update and return the updated todo', () => {
    (mockBookService.createBooks = (input: CreateBookInput) => ({
      id: '42',
      ...input,
    })),
      (mockBookService.updateBook = (id: string, updateinput) => {
        return {
          id: id,
          cim: updateinput.cim,
          szerzo: updateinput.szerzo,
          kiadaseve: updateinput.kiadaseve,
        };
      });
    controller.createBooks({ cim: 'test', szerzo: 'test', kiadaseve: 2002 });

    const newbook = controller.updateBook('1', {
      cim: 'testupdate',
      szerzo: 'test',
      kiadaseve: 2000,
    });
    expect(newbook).toEqual({
      id: '1',
      cim: 'testupdate',
      szerzo: 'test',
      kiadaseve: 2000,
    });
  });

  it('should call todoService.deleteTodo()', () => {
    mockBookService.deleteBook = jest.fn();
    controller.deleteBook('42');
    expect(mockBookService.deleteBook).toHaveBeenCalledWith('42');
  });
});
