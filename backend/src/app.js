import express from "express";
import cors from "cors";

const app= express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.static("public"))

import {router as productRouter} from "./routes/product.routes.js"
app.use("/api/product",productRouter)

export {app}