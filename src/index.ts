import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import multer from "multer"; 
import cardRoutes from "./Card/Infrastructure/Routes/cardRoutes";
import authRoutes from "./Auth/Infrastructure/Routes/authRoutes";
import HandlerException from "./Share/Infrastructure/Exceptions/HandlerException";
import MongooseDatabaseService from "./Share/Infrastructure/Services/MongooseDataBaseService";
import MongooseDatabaseConfig from "./Share/Infrastructure/DataBase/MongooseDatabaseconfig";
import AuthMiddleware from "./Auth/Infrastructure/Middleware/AuthMiddleware";

dotenv.config();
const SERVER_PORT: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000;
const databaseConfig = new MongooseDatabaseConfig();
const databaseService = new MongooseDatabaseService(databaseConfig.uri, databaseConfig.options);
databaseService.connect();
const app = express();
const upload = multer();
const authMiddleware = new AuthMiddleware();
const handlerException = new HandlerException();
app.use(cors());
app.use(express.json()); // json
app.use(express.urlencoded({extended: true})) // form urlenconded
app.use(upload.any()); // formData
//Auth Routes
app.use("/api", authRoutes);
//Card Routes
app.use("/api/cards", authMiddleware.handle, cardRoutes);
// Middleware de manejo de errores
app.use(handlerException.handle);
app.listen(SERVER_PORT, () => {
    console.log(`Sever running on port ${SERVER_PORT}`);
});
