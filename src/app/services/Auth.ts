import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt';
import { ThirtyResponseError } from '../../core/ResponseError';

export default class Auth {
  public config;

  public constructor() {
    this.config = jwtConfig;
  }

  public sign(payload: string) {
    const token = jwt.sign(
      {
        data: payload
      },
      this.config.key,
      { expiresIn: this.config.expiresIn }
    );

    return token;
  }

  public verify(token: string): string {
    const { data } = <any>jwt.verify(token, this.config.key);

    return data;
  }
}
