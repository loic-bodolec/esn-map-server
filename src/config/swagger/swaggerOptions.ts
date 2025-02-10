import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API for esn-map-server',
      version: '1.0.0',
      description: 'This is a REST API application made with Express.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Loïc BODOLEC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            username: { type: 'string' },
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            job: { type: 'string' },
            email: { type: 'string' },
            // password: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
          },
        },
        Client: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            activity: { type: 'string' },
            address: { type: 'string' },
            latitude: { type: 'string' },
            longitude: { type: 'string' },
            logo: { type: 'string' },
            link: { type: 'string' },
            expertises: { type: 'array', items: { $ref: '#/components/schemas/Expertise' } },
            jobs: { type: 'array', items: { $ref: '#/components/schemas/Job' },
            },
          },
        },
        Expertise: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            expertiseName: { type: 'string' },
            // clients: { type: 'array', items: { $ref: '#/components/schemas/Client' } }
          },
        },
        Job: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            jobName: { type: 'string' },
            // clients: { type: 'array', items: { $ref: '#/components/schemas/Client' }
          },
        },
        Consultant: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            technos: { type: 'array', items: { $ref: '#/components/schemas/Techno' } },
            work: { $ref: '#/components/schemas/Work' },
            client: { $ref: '#/components/schemas/Client' },
          },
        },
        Techno: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            technoName: { type: 'string' },
          },
        },
        Work: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            workName: { type: 'string' },
          },
        },
        Contract: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string', enum: ['CDI', 'Freelance'] },
          },
        },
      },
    },
  },

  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;
