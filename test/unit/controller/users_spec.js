import sinon from 'sinon';
import UsersController from '../../../src/controller/users';
import User from '../../../src/models/user';

describe('Controllers: Users', () => {
  const defaultId = '56cb91bdc3464f14678934ca';
  const defaultUser = [
    {
      __V: 0,
      _id: defaultId,
      name: 'Default Name',
      cpf: '12345678901',
      password: 'password',
      role: 'admin',
    },
  ];
  const defaultRequest = {
    params: {},
  };

  describe('get() users', () => {
    it('should return a list of users', async () => {
      const response = {
        send: sinon.spy(),
      };

      User.find = sinon.stub();
      User.find.withArgs({}).resolves(defaultUser);

      const usersController = new UsersController(User);
      await usersController.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultUser);
    });

    it('should return 400 when an error occour', async () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);
      User.find = sinon.stub();
      User.find.withArgs({}).rejects({ message: 'Error' });

      const usersController = new UsersController(User);
      await usersController.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, 'Error');
    });
  });

  describe('getById() users', () => {
    it('should call send with one user', async () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        send: sinon.spy(),
      };

      User.findOne = sinon.stub();
      User.findOne.withArgs({ _id: fakeId }).resolves(defaultUser);

      const usersController = new UsersController(User);

      await usersController.getById(request, response);
      sinon.assert.calledWith(response.send, defaultUser);
    });
  });

  describe('create() user', () => {
    it('should call send with a new user', async () => {
      const requestWithBody = {

        body: defaultUser[0],
        ...defaultRequest,
      };
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
      class fakeUser { // simulo minha model
        save() {}
      }

      response.status.withArgs(201).returns(response);
      sinon
        .stub(fakeUser.prototype, 'save')
        .withArgs()
        .resolves();

      const usersController = new UsersController(fakeUser);

      await usersController.createUser(requestWithBody, response);
      sinon.assert.calledWith(response.send);
    });

    context('when an error occurs', () => {
      it('should return 422', async () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };

        class fakeUser {
          save() {}
        }

        response.status.withArgs(422).returns(response);
        sinon
          .stub(fakeUser.prototype, 'save')
          .withArgs()
          .rejects({ message: 'Error' });

        const usersController = new UsersController(fakeUser);
        await usersController.createUser(defaultRequest, response);
        sinon.assert.calledWith(response.status, 422);
      });
    });
  });

  describe('update() user', () => {
    it('should respond with 200 when the user has been updated', async () => {
      const fakeId = 'a-fake-id';
      const updatedUser = {
        _id: fakeId,
        name: 'Updated User',
        cpf: '10201301',
        password: 'password',
        role: 'user',
      };
      const request = {
        params: {
          id: fakeId,
        },
        body: updatedUser,
      };
      const response = {
        sendStatus: sinon.spy(),
      };
      class fakeUser {
        static findById() {}

        save() {}
      }
      const fakeUserInstance = new fakeUser();

      const saveSpy = sinon.spy(fakeUser.prototype, 'save');
      const findByIdStub = sinon.stub(fakeUser, 'findById');
      findByIdStub.withArgs(fakeId).resolves(fakeUserInstance);

      const usersController = new UsersController(fakeUser);

      await usersController.updateUser(request, response);
      sinon.assert.calledWith(response.sendStatus, 200);
      sinon.assert.calledOnce(saveSpy);
    });

    context('when an error occurs', () => {
      it('should return 422', async () => {
        const fakeId = 'a-fake-id';
        const updatedUser = {
          _id: fakeId,
          name: 'Updated User',
          cpf: '10201301',
          password: 'password',
          role: 'user',
        };
        const request = {
          params: {
            id: fakeId,
          },
          body: updatedUser,
        };
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };

        class fakeUser {
          static findById() {}
        }

        const findByIdStub = sinon.stub(fakeUser, 'findById');
        findByIdStub.withArgs(fakeId).rejects({ message: 'Error' });
        response.status.withArgs(422).returns(response);

        const usersController = new UsersController(fakeUser);

        await usersController.updateUser(request, response);
        sinon.assert.calledWith(response.send, 'Error');
      });
    });
  });

  describe('delete() user', () => {
    it('should respond with 204 when the user has been deleted', async () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        sendStatus: sinon.spy(),
      };
      class fakeUser {
        static deleteOne() {}
      }

      const removeStub = sinon.stub(fakeUser, 'deleteOne');

      removeStub.withArgs({ _id: fakeId }).resolves([1]);

      const usersController = new UsersController(fakeUser);

      await usersController.deleteById(request, response);
      sinon.assert.calledWith(response.sendStatus, 204);
    });

    context('when an error occurs', () => {
      it('should return 400', async () => {
        const fakeId = 'a-fake-id';
        const request = {
          params: {
            id: fakeId,
          },
        };
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };
        class fakeUser {
          static deleteOne() {}
        }

        const removeStub = sinon.stub(fakeUser, 'deleteOne');

        removeStub.withArgs({ _id: fakeId }).rejects({ message: 'Error' });
        response.status.withArgs(400).returns(response);

        const usersController = new UsersController(fakeUser);

        await usersController.deleteById(request, response);
        sinon.assert.calledWith(response.send, 'Error');
      });
    });
  });

  describe('delete() users', () => {
    it('should return 204 when all users has been deleted', async () => {
      const request = {};
      const response = {
        sendStatus: sinon.spy(),
      };
      class fakeUser {
        static deleteMany() {}
      }

      const deleteStub = sinon.stub(fakeUser, 'deleteMany');
      deleteStub.withArgs().resolves(response);

      const usersController = new UsersController(fakeUser);
      await usersController.deleteAll(request, response);

      sinon.assert.calledWith(response.sendStatus, 204);
    });
  });
});
