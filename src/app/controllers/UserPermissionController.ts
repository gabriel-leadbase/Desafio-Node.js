import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import { Permission } from '../models/Permission';
import { User } from '../models/User';
import { UserPermission } from '../models/UserPermission';

class UserPermissionController {
  async store(request: Request, response: Response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const { name } = request.body;
      const { id } = request.params;

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { id }
      });

      if (!user) {
        return response.status(400).json({
          error: {
            code: '001',
            message: 'Usuário não encontrado'
          }
        });
      }

      const permissionRepository = getRepository(Permission);

      const permission = await permissionRepository.findOne({
        where: { name: String(name).toUpperCase() }
      });

      if (!permission) {
        return response.status(400).json({
          error: {
            code: '002',
            message: 'Permissão não encontrado'
          }
        });
      }

      const userPermissionRepository = getRepository(UserPermission);

      const userPermissionExists = await userPermissionRepository.findOne({
        where: { userId: user.id, permissionId: permission.id }
      });

      if (userPermissionExists) {
        return response.status(400).json({
          error: {
            code: '003',
            message: 'Permissão já adicionada'
          }
        });
      }

      const userPermissionRepositoryData = userPermissionRepository.create({
        permissionId: permission.id,
        userId: user.id
      });

      await userPermissionRepository.save(userPermissionRepositoryData);

      return response
        .status(200)
        .json({ message: 'Permissão adicionada com sucesso' });
    } catch (err) {
      return response.status(400).json({
        error: {
          code: '004',
          message: 'Usuário não encontrado'
        }
      });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const { name } = request.body;
      const { id } = request.params;

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { id }
      });

      if (!user) {
        return response.status(400).json({
          error: {
            code: '001',
            message: 'Usuário não encontrado'
          }
        });
      }

      const permissionRepository = getRepository(Permission);

      const permission = await permissionRepository.findOne({
        where: { name: String(name).toUpperCase() }
      });

      if (!permission) {
        return response.status(400).json({
          error: {
            code: '002',
            message: 'Permissão não encontrado'
          }
        });
      }

      const userPermissionRepository = getRepository(UserPermission);

      const userPermissionExists = await userPermissionRepository.findOne({
        where: { userId: user.id, permissionId: permission.id }
      });

      if (!userPermissionExists) {
        return response.status(400).json({
          error: {
            code: '003',
            message: 'Permissão já excluída'
          }
        });
      }

      await userPermissionRepository.delete(userPermissionExists.id);

      return response
        .status(200)
        .json({ message: 'Permissão excluída com sucesso' });
    } catch (err) {
      return response.status(400).json({
        error: {
          code: '004',
          message: 'Usuário não encontrado'
        }
      });
    }
  }
}

export default new UserPermissionController();
