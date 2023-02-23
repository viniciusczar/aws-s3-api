require('dotenv').config()
const express = require('express');
const cors = require ('cors');
const routes = require('./src/routes');
//const bodyParser = require ('body-parser');
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");

//app.use(bodyParser.json({limit:'10mb'})); 
//app.use(bodyParser.urlencoded({extended:true, limit:'10mb', parameterLimit: 1000}));

app.use(fileUpload());
app.use(cors());
app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "tmp", "uploads"))
);


app.listen(process.env.PORT, () => console.log('Example app is listening on port: ', process.env.PORT));