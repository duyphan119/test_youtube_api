const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
require('dotenv').config();
const port = process.env.PORT | 5000

app.use(cors({
   origin: true,
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

configRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}!`))