import express from "express";
import validateInputs from "../middleware/validateInputs.js";
import { createPolicy } from "../controller/policyController.js";

const router = express.Router();

router.post("/create", validateInputs, createPolicy);

export default router;
