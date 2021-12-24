const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

require('./db')
//app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use('/api',require('./routes/userRoute'))
app.listen(port, () => console.log(`Server on port ${port}!`))