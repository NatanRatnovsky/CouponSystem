import {Role} from './role';

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public password?: string,
    public active?: boolean,
    public email?: string,
    public roles?: Role[]
  ) {
  }
}
