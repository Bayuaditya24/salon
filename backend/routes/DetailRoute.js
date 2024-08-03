import express from "express";
import {
  getDetail,
  getDetailById,
  createDetail,
} from "../controller/DetailController.js";

const router = express.Router();

router.get("/detail", getDetail);
router.get("/detail/:id", getDetailById);
router.post("/detail", createDetail);

export default router;
