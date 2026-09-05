import "dotenv/config";
import Express from "express";
import { connectDatabase } from "./config/mongo.database.ts";
import roleRouter from './routes/role.router.ts';
import userRouter from './routes/user.router.ts';
import roomRouter from './routes/room.router.ts';
import reservationRouter from './routes/reservation.router.ts';

const express = Express;
const app = express();
const port = 3000;

app.use(Express.json());
connectDatabase();

app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/reservations', reservationRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});