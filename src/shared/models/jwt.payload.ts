import jwt from 'jsonwebtoken';

export default interface JwtPayload extends jwt.JwtPayload {
  id: string;
  username: string;
  fullname: string;
  email: string;
  roles: Array<string>;
}