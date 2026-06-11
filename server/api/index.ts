import express, { raw, Request, Response } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { YtDlp } from 'ytdlp-nodejs';

const app = express();
const ytdlp = new YtDlp();


app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + Vercel!' });
});

// download
app.get("/download", async (_req: Request, _res: Response) => {
  const url = _req.query.url as string;
  const quality = _req.query.quality as string;
  if (!url) return _res.status(400).send("Missing URL");
  try {
    const video_info = await ytdlp.getInfoAsync(url);
    _res.json({ video_info });
  } catch (error) {
    _res.status(500).send({ error });
  }
})


// Wrap express app in a handler for Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as any, res as any);
}
