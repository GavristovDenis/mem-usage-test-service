const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routers/authRouter')
const graphRouter = require('./Routers/graphRouter')
const PORT = process.env.PORT || 8000
const app = express();

app.use(bodyParser.json())

app.use(cors());
app.use('/auth', authRouter)
app.use('/graph', graphRouter)

const start = () => {


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}

start()