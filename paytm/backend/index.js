import express, { json } from "express";
import { default as mongoose } from "mongoose";
import mainRouter from "../backend/routes/index.js";
import cors from "cors";
import { JWT_SECRET } from "./config.js";
const port = 3300;
const app = express();

// Database connection
mongoose
  .connect(
    "mongodb+srv://sumedhrmundewadi:oiUSicYD2Y3xlSPJ@cluster-0.6awpqed.mongodb.net/paytm?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => {
    console.log(console.error("MongoDB failed to connect!", err));
  });

// Validation libs
app.use(json());

// Added a new orign for cors lib
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow your frontend domain
    credentials: true, // Allow credentials (cookies, tokens)
  })
);
app.use(express.urlencoded({ extended: true }));

// Router middlewares
app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

// Everything's Fine Backend is working very good!
