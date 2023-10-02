export interface User {
    id?: string;
    username: string;
    password: string;
    email: string;
    date_joined?: Date;
  }

  export type RegisterUser = Pick<User , 'username' | 'password' |'email'>
  export type LoginUser = Pick<User, 'email'|'password'>
  export type UpdateUserData = Pick <User,'id' | 'email' | 'password'>