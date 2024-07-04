import { Role } from './role.enum';

export interface TokenPayload {
  sub: number;
  username: string;
  roles: Role[];
}
