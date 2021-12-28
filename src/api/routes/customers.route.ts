import { Router } from "express";
import { makeCallback } from "../../utils";
import { postCustomer, getCustomers } from "../controllers";

const router = Router();

router.post("/", makeCallback(postCustomer));
router.get("/", makeCallback(getCustomers));

export default router;
