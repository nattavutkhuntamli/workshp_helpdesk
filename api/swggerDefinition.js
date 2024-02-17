import swaggerJsdoc from 'swagger-jsdoc';
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Workshop Document Helpdesk API',
        version: '1.0.0',
        description: 'เอกสาร api Helpdesk API ทุกเส่นจะใช้  Bearer token  ที่ได้มาจากการ login ของ admin เอกสารนี้แค่บอกเส้น api บาง function อาจจะใช้ไม่ได้ ขออภัย',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: ' Server',
        }
    ],
    components: {
        schemas: {
          
            Admin: {
                type: 'object',
                properties: {
                    // Define properties of the Admin object here
                    // For example:
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    password:{ type: 'string' },
                    fullname:{ type: 'string' },
                    email:{ type: 'string' },
                    phone:{ type: 'string' },
                    address:{ type: 'string' },
                    // Add more properties as needed
                }
            },
            Customer: {
                type: 'object',
                properties: {
                    // Define properties of the Admin object here
                    // For example:
                    id: { type: 'integer' },
                    FirstName: { type: 'string' },
                    LastName:{ type: 'string' },
                    Email:{ type: 'string' },
                    Phone:{ type: 'string' },
                    phone:{ type: 'string' },
                    Address:{ type: 'string' },
                    // Add more properties as needed
                }
            },

            Device: {
                type: 'object',
                properties: {
                    // Define properties of the Admin object here
                    CustomerId: { type: 'integer' },
                    Images: { type: 'string' },
                    Brand:{ type: 'string' },
                    Model:{ type: 'string' },
                    SerialNumber:{ type: 'string' },
                    Description:{ type: 'string' },
                    // Add more properties as needed
                }
            },

            Technicians:{
                type: 'object',
                properties: {
                    // Define properties of the Admin object here
                    // For example:
                    TechnicianID: { type: 'integer' },
                    username: { type:'string' },
                    password:{ type:'string' },
                    FirstName:{ type:'string' },
                    LastName:{ type:'string' },
                    Email:{ type:'string' },
                    Phone:{ type:'string' },
                    // Add more properties as needed
                }
            },

            Payment:{
                type: 'object',
                properties: {
                    PaymentID: { type: 'integer' },
                    RepairID: { type: 'integer' },
                    Amount: { type: 'string' },
                    PaymentDate: { type:'date' },
                }

            },

            Repair:{
                type: 'object',
                properties: {
                    // Define properties of the Admin object here
                    // For example:
                    RepairID: { type: 'integer' },
                    DeviceID: { type: 'integer' },
                    RepairDate: { type: 'date' },
                    TechnicianID: { type:'integer' },
                    Description: { type:'string' },
                    Cost: { type:'string' },
                    // Add more properties as needed
                }
            }
        }
    }
}

const options = {
    swaggerDefinition,
    apis: [
        './routes/*.js',
        './docuemnt_swagger/admin.swagger.js',
        './docuemnt_swagger/customer.swagger.js',
        './docuemnt_swagger/device.swagger.js',
    ]
}
const swaggerSpec = swaggerJsdoc(options);
export { swaggerSpec };
