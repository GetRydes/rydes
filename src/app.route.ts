import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";

import authRoutes from "./auth/auth.route";
import passengerRoutes from "./passengers/passengers.route";
import cardRoutes from "./cards/cards.route";

const router = Router();

router.get("/status", (_, res) => {
  /* 
    #swagger.description = 'This endpoint is used to check the status of the bubble africa api server'
    #swagger.responses[200] = { 
      description: 'Bubble API server is running' 
    }
    #swagger.responses[500] = { 
      description: 'Bubble API server is down',
    }
  */
  return res.status(200).json({
    message: "Rydes customer service is up and running ",
  });
});

router.use("/auth", authRoutes);
router.use("/passengers", passengerRoutes);
router.use("/cards", cardRoutes);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default router;
