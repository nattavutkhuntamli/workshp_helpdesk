// swggerDefinition.js

import swaggerJsdoc from 'swagger-jsdoc';
import adminSwagger from './docuemnt_swagger/admin.swagger.js';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Workshop Document Helpdesk API',
        version: '1.0.0',
        description: 'Documentation Workshop Helpdesk API',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: ' Server',
        }
    ]
}

const options = {
    swaggerDefinition,
    apis: [
        './routes/*.js',
        './docuemnt_swagger/admin.swagger.js' // เพิ่มเส้นทางไปยังไฟล์ admin.swagger.js ที่นี่
    ]
}
const swaggerSpec = swaggerJsdoc(options);
export { swaggerSpec }; // แก้ไขการส่งออก
