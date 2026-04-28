import express from 'express';
import cors from 'cors';
import routes from "./routes/index.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import serverless from "serverless-http";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ❌ НИКАКОГО app.listen()

export default serverless(app);