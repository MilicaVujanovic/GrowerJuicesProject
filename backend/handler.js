import express from "express";
import serverless from "serverless-http";

import juiceRouter from "../backend/src/routers/juice.router.js";
import orderRouter from "../backend/src/routers/order.router.js";
import userRouter from "../backend/src/routers/user.router.js";

const app = express();
app.use(express.json());

// Mount routere
app.use("/api/juices", juiceRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

// Exportuj **jednu handler funkciju** koju Lambda poziva
export const handler = serverless(app);
