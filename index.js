const express = require("express"),
  cors = require("cors"),
  morgan = require("morgan"),
  helmet = require("helmet");

const app = express(),
  server = require("http").createServer(app);

/* | ~ ~ ~ ~ ~ ~ ~ ~ CONFIG'S ~ ~ ~ ~ ~ ~ ~ | */
const {
  PROJECT: { NAME },
  SERVER: { PORT, NODE_ENV },
  URL: { FRONTEND_URL },
} = require("./server/config/config");

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ CONNECTIONS ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
const dbConnection = require("./server/connection/db");

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ ROUTES ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
const routes = require("./server/route");

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ CONSTANTS ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
const { notFound, welcome } = require("./server/constant/templates");

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ MIDDLEWARES ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
app.use(express.static("uploads"));
app.use(helmet());
if (NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api", routes);

/* | ~ ~ ~ ~ ~ ~ ~ ~ DB-CONNECTION ~ ~ ~ ~ ~ ~ ~ ~ | */
dbConnection.connect();

/* | ~ ~ ~ ~ ~ ~ ~ ~ DEFAULT ROUTES ~ ~ ~ ~ ~ ~ ~ ~ | */
app.all("/", (_, res) => {
  res.send(welcome(NAME));
});

app.all("*", (_, res) => {
  res.status(404).send(notFound());
});

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ SERVER ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
});
