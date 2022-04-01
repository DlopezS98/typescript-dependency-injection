export default interface IUsers {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at?: Date;
}

export class Users implements IUsers {
  id!: string;
  firstname!: string;
  lastname!: string;
  username!: string;
  password!: string;
  created_at!: Date;
  updated_at?: Date | undefined;

  constructor(user: IUsers) {
    Object.assign(this, user);
  }
}