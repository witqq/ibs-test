import {Router, Application, Response, Request} from "express";
import {ApiError} from "../utils/api-error";

const API_PATH = "/api";
const apiRouter = Router();

apiRouter.get("/test", function (req, res, next) {
  res.json({hello: "api"});
});

apiRouter.use(function (err: Error, req: Request, res: Response, next) {
  if (err instanceof ApiError) {
    if (err.status != null) {
      res.status(err.status);
    }
    return res.json({success: false, message: err.message});
  }
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export function initApiRouter(app: Application) {
  return app.use(API_PATH, apiRouter);
}


