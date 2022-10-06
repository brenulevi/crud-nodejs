require("dotenv-safe").config();

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kibii_:BQCBltUtBzdP9AuU@learningmongo.llekg2g.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

const routes = require("./routes");

app.use(bodyParser.json());
app.use(routes);

const server = http.createServer(app);
server.listen(3000, () => console.log("Server listening on port 3000..."));