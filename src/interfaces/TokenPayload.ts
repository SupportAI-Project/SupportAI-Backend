import { Role } from 'src/auth/roles/role.enum';

export interface TokenPayload {
  sub: number;
  username: string;
  roles: Role[];
}
