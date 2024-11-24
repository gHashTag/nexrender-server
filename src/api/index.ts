import { Router } from "express";
import type { RequestHandler } from "express";

const router: Router = Router();

const healthCheckHandler: RequestHandler = (_req, res) => {
  return res.json({ status: "ok" });
};

router.get("/health", healthCheckHandler);

export default router;
