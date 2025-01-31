if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express');
const cors = require('cors')
const app = express();
const routes = require('./routes/index.js');

app.use(cors())
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routes)


// app.listen(port, () =>
//     console.log(`Server running on http://localhost:${port}`)
//   );

module.exports = app