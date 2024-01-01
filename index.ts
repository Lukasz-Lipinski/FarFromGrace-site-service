import express, { Express, Request, Response } from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import EmailRoutes from "./routes/email"
import cors, { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:4200",
  "https://farfromgrace-site.vercel.app/"
];

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get("/api", (req: Request, res: Response) => {
  res.json({
    info: "Service works"
  });
});
app.use("/api/email", EmailRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});