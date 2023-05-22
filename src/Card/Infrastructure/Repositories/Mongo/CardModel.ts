import { Document, Schema, model } from "mongoose";
import CardModelContract from "../../../Domain/Contracts/CardSchemaContract";

const cardSchema: Schema<CardModelContract & Document> = new Schema({
    number: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    expirationMonth: {
        type: String,
        required: true
    },
    expirationYear: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required:true
    },
    expirationToken: {
        type: Date,
        required:true
    },
});
const CardModel = model<CardModelContract & Document>("Card", cardSchema)
export default CardModel