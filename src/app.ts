import "dotenv/config";
import Express from "express";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";
import { connectDatabase } from "./config/mongo.database.ts";
import roleRouter from './routes/role.router.ts';
import userRouter from './routes/user.router.ts';
import roomRouter from './routes/room.router.ts';
import reservationRouter from './routes/reservation.router.ts';

const express = Express;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(Express.json());
connectDatabase();

app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/reservations', reservationRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Erreurs globales
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});