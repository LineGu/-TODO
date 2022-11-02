import { rest } from 'msw';
import { CreateTodoRequest, Todo } from '../models/todo';
import { v4 as uuid } from 'uuid';

const TODO_KEY = 'ray-goo-todo-list';

const INIT_TODO: Todo[] = [
  {
    title: '투두 리스트 예시입니다.',
    description: '설명입니다.',
    priority: 'HIGH',
    creator: '강현구',
    deadline: '2023-02-02T00:00:00', // ISO Type
    createAt: '2022-01-05T12:12:50',
    id: uuid(),
  },
];

if (window.localStorage.getItem(TODO_KEY) == null) {
  window.localStorage.setItem(TODO_KEY, JSON.stringify({ INIT_TODO }));
}

const isValidCreateTodoRequestType = (data: unknown): data is CreateTodoRequest => {
  const nonNullableFeilds: (keyof CreateTodoRequest)[] = ['creator', 'deadline', 'description', 'priority', 'title'];
  const missingFileds = nonNullableFeilds.filter(nonNullableFeild => (data as Partial<Todo>)[nonNullableFeild] == null);

  if (missingFileds.length !== 0) {
    return false;
  }

  return true;
};

const isValidTodoType = (data: unknown): data is Todo => {
  const nonNullableFeilds: (keyof Todo)[] = [
    'creator',
    'deadline',
    'description',
    'priority',
    'title',
    'createAt',
    'id',
  ];
  const missingFileds = nonNullableFeilds.filter(nonNullableFeild => (data as Partial<Todo>)[nonNullableFeild] == null);

  if (missingFileds.length !== 0) {
    return false;
  }

  return true;
};

const getTodo = (): Todo[] => {
  const savedItem = window.localStorage.getItem(TODO_KEY);
  return savedItem == null ? [] : JSON.parse(savedItem);
};

const addTodo = (todo: Todo) => {
  const todos = getTodo();
  window.localStorage.setItem(TODO_KEY, JSON.stringify([...todos, todo]));
};

const findTodo = (id: string) => {
  const todos = getTodo();
  return todos.find(todo => todo.id === id);
};

const deleteTodo = (id: string) => {
  const targetTodo = findTodo(id);
  if (targetTodo == null) {
    throw new Error('NOT FOUND ID');
  }

  const todos = getTodo();
  const updatedTodos = todos.filter(todo => todo.id !== id);

  window.localStorage.setItem(TODO_KEY, JSON.stringify(updatedTodos));
};

const patchTodo = (id: string, updatedTodo: Todo) => {
  const targetTodo = findTodo(id);
  if (targetTodo == null) {
    throw new Error('NOT FOUND ID');
  }

  const todos = getTodo();
  const updatedTodos = todos.map(todo => {
    if (todo.id === id) {
      return updatedTodo;
    }
    return todo;
  });

  window.localStorage.setItem(TODO_KEY, JSON.stringify(updatedTodos));
};

export const handlers = [
  /**
   * 투두리스트 조회
   *
   * response : Todo[]
   *
   * */
  rest.get('/todo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getTodo()));
  }),

  /**
   * 투두리스트 생성
   *
   * request : CreateTodoRequest
   * response : { id: string }
   * error : 400(need some field)
   *
   * */
  rest.post('/todo', (req, res, ctx) => {
    const { body } = req;
    if (body == null) {
      return res(ctx.status(400));
    }

    if (!isValidCreateTodoRequestType(body)) {
      return res(ctx.status(400));
    }

    const newTodo: Todo = {
      ...body,
      id: uuid(),
      createAt: new Date().toISOString(),
    };
    addTodo(newTodo);
    return res(ctx.status(200), ctx.json({ id: uuid() }));
  }),

  /**
   * 투두리스트 삭제
   *
   * error : 400(id is not valid)
   *
   * */
  rest.delete('/todo/:id', (req, res, ctx) => {
    const targetId = req.params.id;
    try {
      deleteTodo(targetId as string);
      return res(ctx.status(200));
    } catch (err) {
      return res(ctx.status(400));
    }
  }),

  /**
   * 투두리스트 내용 수정
   *
   * request : Todo
   * error : 400(id is not valid)
   *
   * TODO: 시간되면 updatedAt 구현
   *
   * */
  rest.put('/todo/:id', (req, res, ctx) => {
    const targetId = req.params.id as string;

    try {
      patchTodo(targetId, req.body as Todo);
      return res(ctx.status(200));
    } catch (err) {
      return res(ctx.status(400));
    }
  }),

  /**
   * 투두리스트 순서 변경
   *
   * request : Todo[]
   * error : 400(field missing)
   *
   * */
  rest.post('/todo/reorder', (req, res, ctx) => {
    const { body } = req;

    // is body type Todo[]?
    if (!(Array.isArray(body) && body.every(todo => isValidTodoType(todo)))) {
      return res(ctx.status(400));
    }

    window.localStorage.setItem(TODO_KEY, JSON.stringify(body));
    return res(ctx.status(200));
  }),
];
