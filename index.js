const express = require('express')
const app = express()
const cors = require('cors');
const routes = require('./routes/index');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT ;

app.use(cors({origin: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routes);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})








