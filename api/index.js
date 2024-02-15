import express  from 'express';
const app = express();
import swaggerUi  from 'swagger-ui-express'; 
import { swaggerSpec  } from './swggerDefinition.js'; // แก้ไขการ import


const port = process.env.PORT || 3000;

import Router_api from './routes/index.js';
import Clients from './configs/connect.js';

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false, limit: "1000MB" }));
app.use(express.json({ limit: "1000MB" }));

app.use('/',express.static(`./public/uploads/device/`))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', Router_api);

app.use((req,res) => {
    return res.status(404).json({
        message: 'Not Found'
    });
});

// Start the server
const startServer = async() => {
    try {
        await Clients.authenticate();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
startServer()