import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { TokenPayload } from 'src/interfaces/TokenPayload';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    // initializes the parent Strategy with the necessary options for JWT validation. (for decoding and validation)
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.cookies?.Authentication ||
          request?.Authentication ||
          request?.headers.Authentication ||
          request?.headers.authentication ||
          request?.authentication,
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ username }: TokenPayload) {
    console.log('username: ', username);
    return this.usersService.getUser(username);
  }
}
