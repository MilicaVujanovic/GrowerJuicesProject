import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import cors from "cors";
import helmet from 'helmet';
import juiceRouter from './routers/juice.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import { dbConnect } from './configs/database.config.js';
import serverless from 'serverless-http';

// __dirname za ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB
dbConnect();

const app = express();

// Postavi Helmet sa CSP direktivama
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      imgSrc: ["'self'", "data:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
    }
  }
}));

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"], // frontend URL
  })
);

app.use("/api/juices", juiceRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});

// Serverless export za AWS Lambda
export const handler = serverless(app);
