import bcrypt from 'bcrypt';
import Util from 'util';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import config from 'config';
import { expect } from 'chai';
import AuthService from '../../../src/services/auth.js';

const hasAsync = Util.promisify(bcrypt.hash);

describe('Service: Auth', () => {
  context('autenticate', () => {
    it('should authenticate an user', async () => {
      const fakeUserModel = {
        findOne: sinon.stub(),
      };
      const user = {
        name: 'kalebe',
        cpf: '123456789120',
        password: '12345',
      };
      const authService = new AuthService(fakeUserModel);
      const hashedPassword = await hasAsync(user.password, 10);
      const userFromDatabase = {
        ...user,
        password: hashedPassword,
      };

      fakeUserModel.findOne.withArgs({ cpf: user.cpf }).resolves(userFromDatabase);

      const res = await authService.authenticate(user);

      expect(res).to.eql(userFromDatabase);
    });

    it('should return false when the password does not match', async () => {
      const user = {
        cpf: '13245678910',
        password: '12345',
      };

      const fakeUserModel = {
        findOne: sinon.stub(),
      };

      fakeUserModel.findOne.resolves({ cpf: user.cpf, password: 'fakePassword' });

      const authService = new AuthService(fakeUserModel);
      const response = await authService.authenticate(user);

      expect(response).to.be.false;
    });
  });

  context('generateToken', () => {
    it('should generate a JWT token from a payload', () => {
      const payload = {
        name: 'kalebe',
        cpf: '12345678901',
        password: '12345',
      };
      const expectedToken = jwt.sign(payload, config.get('auth.key'), {
        expiresIn: config.get('auth.tokenExpiresIn'),
      });
      const generatedToken = AuthService.generateToken(payload);
      expect(generatedToken).to.eql(expectedToken);
    });
  });
});
