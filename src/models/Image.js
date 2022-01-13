import { Schema,model } from "mongoose";


const imageSchema = new Schema({
    title:{ type: String },
    description:{ type: String },
    filename:{ type: String },
    originalname: { type: String },
    path: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    created_at: { type: Date, default: Date.now() },
    versionKey: false
});

export default model('Images', imageSchema);