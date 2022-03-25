import 'reflect-metadata';
import UsersService from '@Services/users.service';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import Users from '@Database/models/users.model';
import UserDto from '@Shared/Dtos/responses/users.dto';
import usersModelMock from '../../mocks/users.mock';

let usersService: UsersService;
let userRepository: IUsersRepository;
let users: UserDto[];

beforeAll(() => {
  const Mock = jest.fn<IUsersRepository, Users[]>(() => ({
    getAll: jest.fn().mockReturnValue(usersModelMock),
    getById: jest
      .fn()
      .mockImplementation((id: string) =>
        usersModelMock.find((user) => user.id === id)
      ),
  }));

  userRepository = new Mock();
  usersService = new UsersService(userRepository);
});

describe('(method): getAll - should return a list of users', () => {
  beforeAll(() => {
    users = usersService.getAll();
  });

  it('should have more tha one record', () => {
    expect(users.length).toBeGreaterThan(0);
  });

  it('users should be an array of user dtos', () => {
    const firstUser = usersModelMock[0];
    const fullname = `${firstUser.firstname} ${firstUser.lastname}`;
    const mockedUser: UserDto = {
      id: firstUser.id,
      username: firstUser.username,
      createdAt: firstUser.created_at,
      fullname,
      updatedAt: firstUser.updated_at,
    };

    expect(users).toContainEqual<UserDto>(mockedUser);
    users.forEach((user) => {
      expect(user).toHaveProperty<UserDto>('fullname');
      expect(user).not.toHaveProperty<UserDto>('firstname');
      expect(user).not.toHaveProperty<UserDto>('lastname');
    });
  });
});

describe('(method): getById - should return a single user', () => {
  it('return a single user', () => {
    const user1 = usersService.getById('1200012');
    const user2 = usersService.getById('1288120');
    expect(user1?.username).toEqual('DlopezS98');
    expect(user2?.username).toEqual('01DlopezS98');
  });
});
