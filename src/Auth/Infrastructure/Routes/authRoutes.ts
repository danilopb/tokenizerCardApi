import express from "express";
import AuthLoginController from "../Controllers/AuthLoginController";

const router = express.Router();
const authLoginController = new AuthLoginController();

router.post('/login', (req, res) => authLoginController.__invoke(req, res));

export default router;
