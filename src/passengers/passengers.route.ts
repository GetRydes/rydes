import { Router } from "express";
import { makeCallback } from "../utils";
import {
  postCustomer,
  getCustomers,
  getCustomer,
  patchCustomer,
  deleteCustomer,
} from "./passengers.controller";

const router = Router();

router.post("/", makeCallback(postCustomer));
router.get("/", makeCallback(getCustomers));
router.get("/:id", makeCallback(getCustomer));
router.patch("/:id", makeCallback(patchCustomer));
router.delete("/:id", makeCallback(deleteCustomer));

export default router;
