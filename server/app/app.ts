import * as express from "express";
import * as path from "path";
import bodyParser = require("body-parser");
import {initApiRouter} from "../routes/api";

export function initApp() {
  const app = express();


  const root = path.resolve("static");
  app.use(express.static(root));

  app.use(bodyParser());


  initApiRouter(app);

  const port = process.env.port || process.env.PORT || 8080;

  app.listen(port, function () {
    console.log(" listening on %s", port);
  });
}