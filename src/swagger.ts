import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'La bonne salle au bon moment | API',
      version: '1.0.0',
      description: 'API REST de réservation de salles — Node.js + Express + MongoDB',
      contact: {
        name: 'Fanny Saez',
        url: 'https://github.com/fannysaez/la-bonne-salle-au-bon-moment-backend-cda',
      },
    },
    servers: [{ url: 'http://localhost:3000/api', description: 'Serveur local' }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
      schemas: {
        Room: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '664a1b2c3d4e5f6a7b8c9d0e' },
            name: { type: 'string', example: 'Salle Horizon' },
            capacity: { type: 'number', example: 20 },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '664a1b2c3d4e5f6a7b8c9d0e' },
            lastname: { type: 'string', example: 'Dupont' },
            firstname: { type: 'string', example: 'Marie' },
            email: { type: 'string', example: 'marie@example.com' },
            roleId: { type: 'string', example: '664a1b2c3d4e5f6a7b8c9d0e' },
          },
        },
        Reservation: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '664a1b2c3d4e5f6a7b8c9d0e' },
            userId: { type: 'string', example: '664a1b2c3d4e5f6a7b8c9d0e' },
            roomId: { type: 'string', example: '664a1b2c3d4e5f6a7b8c9d0e' },
            startDate: { type: 'string', format: 'date-time', example: '2026-09-24T09:00:00.000Z' },
            endDate: { type: 'string', format: 'date-time', example: '2026-09-24T11:00:00.000Z' },
          },
        },
        Role: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '664a1b2c3d4e5f6a7b8c9d0e' },
            label: { type: 'string', example: 'Admin' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Erreur serveur' },
          },
        },
      },
    },
    security: [{ cookieAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Connexion / déconnexion' },
      { name: 'Rooms', description: 'Gestion des salles' },
      { name: 'Users', description: 'Gestion des utilisateurs' },
      { name: 'Reservations', description: 'Gestion des réservations' },
      { name: 'Roles', description: 'Gestion des rôles' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);