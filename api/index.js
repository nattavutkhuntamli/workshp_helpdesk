import express  from 'express';
const app = express();

const port = process.env.PORT || 3000;

import Router_api from './routes/index.js';
import Clients from './configs/connect.js';

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false, limit: 10000 }));
app.use(express.json());


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