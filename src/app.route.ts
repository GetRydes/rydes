import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";

import authRoutes from "./app/auth/auth.route";
import passengerRoutes from "./app/passengers/passengers.route";
import cardRoutes from "./app/cards/cards.route";

const router = Router();

router.get("/status", (_, res) => {
  /* 
    #swagger.description = 'This endpoint is used to check the status of the Rydes api server'
    #swagger.responses[200] = { 
      description: 'Rydes API server is running' 
    }
    #swagger.responses[500] = { 
      description: 'Rydes API server is down',
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
