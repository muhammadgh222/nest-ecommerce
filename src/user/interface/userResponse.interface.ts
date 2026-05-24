import { User } from '../user.schema';

export interface CreateUserResponse {
  status: number;
  message: string;
  data: User;
}
