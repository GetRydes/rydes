import { Router } from "express";
import { makeCallback } from "../../utils";
import isAuthenticated from "../../utils/authenticated";
import {
  postCustomer,
  getCustomers,
  getCustomer,
  patchCustomer,
  deleteCustomer,
} from "./passengers.controller";

const router = Router();

router.post("/", makeCallback(postCustomer));
router.get("/", isAuthenticated, makeCallback(getCustomers));
router.get("/:id", isAuthenticated, makeCallback(getCustomer));
router.patch("/:id", isAuthenticated, makeCallback(patchCustomer));
router.delete("/:id", isAuthenticated, makeCallback(deleteCustomer));

export default router;
