import { Request, Response } from 'express';
import { createRole } from '../useCases/createRole';

export class RoleController {
  async create(request: Request, response: Response) {
    const { name, description, permissions } = request.body;

    try {
      const roleData = await createRole({ name, description, permissions });

      return response.json(roleData);
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  }
}
