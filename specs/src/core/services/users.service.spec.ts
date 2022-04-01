import 'reflect-metadata';
import UsersService from '@Services/users.service';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import usersModelMock, { userDtoResp } from '@Mocks/users.mock';
import IUsers from '@Database/models/users.model';
import UserRespDto from '@Shared/dtos/responses/users.dto';

let usersService: UsersService;
let userRepository: IUsersRepository;
let users: UserRespDto[];

beforeAll(() => {
  const Mock = jest.fn<IUsersRepository, IUsers[]>(() => ({
    getAll: jest.fn().mockReturnValue(usersModelMock),
    getById: jest
      .fn()
      .mockImplementation((id: string) =>
        usersModelMock.find((user) => user.id === id)
      ),
    create: jest.fn().mockReturnValue(usersModelMock[0])
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
    expect(users).toContainEqual<UserRespDto>(userDtoResp);
    users.forEach((user) => {
      expect(user).toHaveProperty<UserRespDto>('fullname');
      expect(user).not.toHaveProperty<UserRespDto>('firstname');
      expect(user).not.toHaveProperty<UserRespDto>('lastname');
    });
  });
});

describe('(method): getById - should return a single user', () => {
  it('return a single user', () => {
    const user1 = usersService.getById(userDtoResp.id);
    const user2 = usersService.getById('1288120');
    expect(user1?.username).toEqual(userDtoResp.username);
    expect(user2?.username).toEqual('01DlopezS98');
    expect(usersService.getById('0000')).toBeUndefined();
  });
});
