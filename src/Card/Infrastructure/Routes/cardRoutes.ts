import express from "express";
import CardTokenizerController from "../Controllers/CardTokenizerController";
import CardFindByTokenController from "../Controllers/CardFindByTokenController";

const router = express.Router();
const cardTokenizerController = new CardTokenizerController();
const cardFindByTokenController = new CardFindByTokenController();

router.get('/find/:token', (req, res) => cardFindByTokenController.__invoke(req, res));
router.post('/generate-token', (req, res) => cardTokenizerController.__invoke(req, res));

export default router;
