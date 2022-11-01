import { rest } from 'msw';

export const handlers = [
  /**
   * 투두리스트 조회
   *
   * response : Todo[]
   *
   * */
  rest.get('/todo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ some: 1 }));
  }),

  /**
   * 투두리스트 생성
   *
   * request : Todo
   * response : { id: string }
   * error : 400(need some field)
   *
   * */
  rest.post('/todo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ some: 1 }));
  }),

  /**
   * 투두리스트 삭제
   *
   * request : { id: string }
   * error : 400(id is not valid)
   *
   * */
  rest.delete('/todo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ some: 1 }));
  }),

  /**
   * 투두리스트 내용 수정
   *
   * request : { id: string; description: string; }
   * error : 400(id is not valid)
   *
   * */
  rest.put('/todo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ some: 1 }));
  }),

  /**
   * 투두리스트 순서 변경
   *
   * request : { id: string }[] or Todo[]
   * error : 400(id is not valid)
   *
   * */
  rest.post('/todo/reorder', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ some: 1 }));
  }),
];
