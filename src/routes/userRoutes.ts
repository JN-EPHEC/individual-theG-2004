// Source - https://stackoverflow.com/q/55029813
// Posted by Shaun Luttin
// Retrieved 2026-02-10, License - CC BY-SA 4.0
import express, { type Request, type Response } from "express";

const router = express.Router();
const users = [
{ id: 1, name: "Alice" },
{ id: 2, name: "Bob" },
];

router.get('/api/users', (req : Request, res : Response) => { 
res.json(users);
});

export { router as userRoutes };