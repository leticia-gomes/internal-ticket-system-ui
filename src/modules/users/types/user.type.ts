export type UserRole =
  | 'ADMIN'
  | 'AGENT'
  | 'REQUESTER';


export interface User {

  id: number;

  name: string;

  email: string;

  role: UserRole;

  createdAt: string;

}
