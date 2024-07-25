import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import validator from 'validator';
import { nanoid } from 'nanoid';
import * as _ from 'lodash-es';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const host = process.env.HOST;
const port = process.env.PORT || 5000;
const baseUrl = process.env.API_BASE_URL;

const memory = new Map();

app.post(`${baseUrl}/models/url`, (req, res) => {
  const longUrl = _.get(req.body, 'longUrl');
  if (!longUrl) {
    res.status(422).send('You try to shorten invalid URL');
  }
  if (Array.from(memory.values()).includes(longUrl)) {
    for (const [key, value] of memory.entries()) {
      if (value === longUrl) {
        res.json({ shortUrl: `http://${host}:${port}/s/${key}`, createdAt: Date.now() });
      }
    }
  }
  const isValidUrl = validator.isURL(longUrl);
  if (isValidUrl) {
    const shortUrl = nanoid();
    memory.set(shortUrl, longUrl);
    res.json({ shortUrl: `http://${host}:${port}/s/${shortUrl}`, createdAt: Date.now() });
  } else {
    res.status(422).send('You try to shorten invalid URL');
  }
});

app.get(`/s/:shortUrl`, (req, res) => {
  const shortUrl = _.get(req, 'params.shortUrl');
  if (!shortUrl) {
    res.status(404).send('We did not get short URL');
  }
  const longUrl = memory.get(shortUrl);
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('We did not shorten this address');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});