import {Router, Application, Response, Request} from "express";
import {ApiError} from "../utils/api-error";
import {API_PATH} from "../../share/constants";
import {PEOPLE_MOCK, CLAIM_STATUSES_MOCK, mockIdName, CLAIMS_MOCK} from "../data/data-mock";
import {getClaims, getClaimById} from "../data/claims";
import {Claim} from "../../share/data/interfaces/claim";

const apiRouter = Router();

apiRouter.get("/test", function (req, res, next) {
  res.json({hello: "api"});
});

apiRouter.get("/people", function (req, res, next) {
  res.json(PEOPLE_MOCK);
});

apiRouter.get("/claimStatuses", function (req, res, next) {
  res.json(CLAIM_STATUSES_MOCK);
});

apiRouter.get("/claims", function (req, res, next) {
  res.json(getClaims());
});

apiRouter.get("/claims", function (req, res, next) {
  res.json(getClaims());
});



apiRouter.get("/claim/:id", function (req, res, next) {
  const id = req.params.id;
  const claim = getClaimById(id);
  if (!claim) {
    throw new ApiError(404, "Claim not found");
  }
  res.json(claim);
});

apiRouter.put("/claim/:id", function (req, res, next) {
  const id = req.params.id;
  const claim = getClaimById(id);
  if (!claim) {
    throw new ApiError(404, "Claim not found");
  }
  const newClaim: Claim = req.body;
  claim.name = newClaim.name;
  claim.status = newClaim.status;
  claim.from = newClaim.from;
  claim.to = newClaim.to;
  claim.docNum = newClaim.docNum;
  res.json(claim);
});

apiRouter.delete("/claim/:id", function (req, res, next) {
  const id = req.params.id;
  const claim = getClaimById(id);
  if (!claim) {
    throw new ApiError(404, "Claim not found");
  }
  CLAIMS_MOCK.splice(CLAIMS_MOCK.indexOf(claim), 1);
  res.json(claim);
});

apiRouter.post("/claim", function (req, res, next) {
  const newClaim: Claim = req.body;
  const claim = mockIdName(newClaim.name) as Claim;
  claim.status = newClaim.status;
  claim.from = newClaim.from;
  claim.to = newClaim.to;
  claim.docNum = newClaim.docNum;
  CLAIMS_MOCK.push(claim);
  res.json(claim);
});

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


