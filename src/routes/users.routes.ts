import { Router } from 'express';
import UsersController from '@Controllers/users.controller';

export default class UsersRoutes {
  private readonly usersController: UsersController;
  private readonly router: Router;

  constructor(usersController: UsersController) {
    this.usersController = usersController;
    this.router = Router();
  }
  
  public initialize = (): Router => {
    this.router.get('/', this.usersController.getUsers);
    return this.router;
  };
}