import Users from '@Database/models/users.model';
import UserResDto from '@Shared/dtos/responses/users.dto';

export const userModel: Users = {
  id: '1200012',
  firstname: 'Danny',
  lastname: 'Lopez',
  username: 'DlopezS98',
  password: '***Gen3ricP@ssword***',
  created_at: new Date('2022-03-25T21:25:00.227Z'),
};

const usersModel: Users[] = [
  { ...userModel },
  {
    id: '1288120',
    firstname: 'Aldahir',
    lastname: 'Sanchez',
    username: '01DlopezS98',
    password: '*_*Gen3ricP@ssword*_*',
    created_at: new Date('2022-03-25T21:25:00.227Z'),
  },
];

export const userDtoResp: UserResDto = {
  id: userModel.id,
  username: userModel.username,
  fullname: `${userModel.firstname} ${userModel.lastname}`,
  createdAt: userModel.created_at,
  updatedAt: userModel.updated_at,
};

export default usersModel;
