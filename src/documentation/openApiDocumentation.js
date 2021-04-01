module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Desafio BackEnd',
    description: 'API Desafio BackEnd',
    contact: {
      name: 'Joao Cirqueira',
      url: 'https://www.github.com/jpcirqueira',
    },
  },
  servers: [
    {
      url: 'http://localhost:3333/',
      description: 'Local server',
    },
  ],
  tags: [
    {
      name: 'operations',
    },
  ],
  paths: {
    '/users': {
      post: {
        tags: ['operations'],
        description: 'Create User',
        operationId: 'createUser',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/User',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'novo usuario criado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/User',
                },
              },
            },
          },
          400: {
            description: 'erro ao criar usuario',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/session': {
      post: {
        tags: ['operations'],
        description: 'Create Session',
        operationId: 'createSession',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/User',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'nova sessao criada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/sessionResponse',
                },
              },
            },
          },
          400: {
            description: 'erro ao criar sessao',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/alterrole': {
      put: {
        tags: ['operations'],
        description: 'Alter Role',
        operationId: 'alterRole',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/cpf',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'role alterada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/sessionResponse',
                },
              },
            },
          },
          400: {
            description: 'erro ao alterar role',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      cpf: {
        type: 'string',
        example: '02891921823',
      },
      senha: {
        type: 'string',
        example: '92383sdhkdksj',
      },
      admin: {
        type: 'boolean',
        example: 'true',
      },
      token: {
        type: 'string',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImFkbWluIjp0cnVlLCJpYXQiOjE2MTcyMzkxMjcsImV4cCI6MTYxNzMyNTUyN30.aVDHTo7SESzMqYxkt5XA1UCbO9TivreISx3n4T9dvvQ',
      },
      User: {
        type: 'object',
        properties: {
          cpf: {
            $ref: '#/components/schemas/cpf',
          },
          senha: {
            $ref: '#/components/schemas/senha',
          },
          admin: {
            $ref: '#/components/schemas/admin',
          },
        },
      },
      sessionResponse: {
        type: 'object',
        properties: {
          cpf: {
            $ref: '#/components/schemas/cpf',
          },
          senha: {
            $ref: '#/components/schemas/senha',
          },
          admin: {
            $ref: '#/components/schemas/admin',
          },
          token: {
            $ref: '#/components/schemas/token',
          },
        },
      },
      Session: {
        type: 'object',
        properties: {
          cpf: {
            $ref: '#/components/schemas/cpf',
          },
          senha: {
            $ref: '#/components/schemas/senha',
          },
        },
      },
      AlterRole: {
        type: 'object',
        properties: {
          cpf: {
            $ref: '#/components/schemas/cpf',
          },
        },
      },
    },
  },
};
