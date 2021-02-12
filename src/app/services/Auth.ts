import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt';

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

  public verify(token: string): string | object {
    try {
      const { data } = <any>jwt.verify(token, this.config.key);

      return data;
    } catch (err) {
      return {
        error: true,
        message: err.message
      };
    }
  }
}
