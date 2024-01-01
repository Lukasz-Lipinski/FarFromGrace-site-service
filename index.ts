import express, { Express, Request, Response } from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import  EmailRoutes from "./routes/email"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/email", EmailRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});