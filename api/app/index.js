import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import adminRouter from "./routes/admin/index.js";
import webRouter from "./routes/web/index.js";
import "dotenv/config";
const app = express();
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/admin", adminRouter);
app.use(
  "/web",
  webRouter
);

app.use((req, res) => {
  return res.status(404).json({
    message: "Not found",
    status: 404,
  });
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

server.timeout = 30000;
