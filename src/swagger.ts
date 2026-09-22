import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'La Bonne Salle API',
      version: '1.0.0',
      description: 'API de réservation de salles',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);