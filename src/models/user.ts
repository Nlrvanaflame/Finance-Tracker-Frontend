export interface User {
    id?: string;
    username: string;
    hashed_password: string;
    email: string;
    date_joined?: Date;
  }

  export type LoginUser = Pick<User, 'email'|'hashed_password'>