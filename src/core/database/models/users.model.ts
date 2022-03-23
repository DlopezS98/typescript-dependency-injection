export default interface Users {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at?: Date;
}