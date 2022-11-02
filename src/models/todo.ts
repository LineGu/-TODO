export type Priority = 'HIGH' | 'NORMAL' | 'LOW';

export interface Todo {
  title: string;
  description: string;
  priority: Priority;
  creator: string;
  deadline: string;
  createAt: string;
  id: string;
}

/* 
    {
    title: string;
    description: string;
    priority: Priority;
    creator: string;
    deadline: string;
    }
*/
export type CreateTodoRequest = Omit<Todo, 'id' | 'createAt'>;
