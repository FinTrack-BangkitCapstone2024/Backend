const express = require('express')
const app = express()
const cors = require('cors');
const routes = require('./routes/index');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const port = process.env.PORT ;

app.use(cors({origin: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.redirect('/docs');
});
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs', 'index.html'));
});


app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})








