import { Request, Response } from 'express';
import { createPermission } from '../useCases/createPermission';
import { deletePermission } from '../useCases/deletePermission';

export class PermissionController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      const permissionData = await createPermission({ name, description });

      return response.json(permissionData);
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { name } = request.body;

    try {
      await deletePermission({ name });

      return response.status(200).json();
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  }
}
