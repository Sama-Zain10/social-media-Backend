import express, { type Response, type Request, type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { authRouter, commentRouter, postRouter, userRouter } from "./modules";
import { globalErrorHandler, NotFoundException } from "./utils/response/error.res";
import connectDB from "./DB/connections";
import { corsOptions } from "./utils/cors/cors.utils";

// rate limmit
const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
})
const bootstrap = async (app: Express): Promise<void> => {

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(limiter);
  // DB connection
  await connectDB();
  app.get("/", (req: Request, res: Response): Response => {
    return res.send("Welcome from socail-media");
  });
  app.use("/api/auth", authRouter);
  app.use("/api/post", postRouter);
  app.use("/api/comment", commentRouter);
  app.use("/api/user", userRouter);
  app.use(globalErrorHandler);
  app.all("/*dummy", (req: Request, res: Response): Response => {
     throw new NotFoundException("Not Found Handler");
  });
  
}

export default bootstrap; 