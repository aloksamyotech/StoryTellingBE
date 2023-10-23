import express from "express";
import cors from 'cors'
import { dbConfiguration } from "./src/auth/configuration.js";
import routes from "./src/routes/main.js";
import "dotenv/config.js";
import { indication } from "./src/helper/constents/message.js";

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);
dbConfiguration();

app.listen(process.env.PORT, () => {
  console.log(indication.LISTINING_ON + process.env.PORT);
});
