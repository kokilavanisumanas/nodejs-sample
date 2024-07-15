const express = require('express');
const connectDB = require('./database/db');
const userRoutes = require('./user');

const app = express();
const port = 3001;

app.use(express.json());

connectDB();

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
