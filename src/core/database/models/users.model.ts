export default interface IUsers {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  roles: Array<string>;
  password: string;
  created_at: Date;
  updated_at?: Date;
}

export class Users implements IUsers {
  id!: string;
  firstname!: string;
  lastname!: string;
  username!: string;
  roles!: Array<string>;
  email!: string;
  password!: string;
  created_at!: Date;
  updated_at?: Date | undefined;

  constructor(user: IUsers) {
    Object.assign(this, user);
  }
}