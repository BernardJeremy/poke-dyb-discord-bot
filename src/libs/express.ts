import express from 'express';

const {
  EXPRESS_PORT,
} = process.env;

const app = express();

app.listen(EXPRESS_PORT, () => {
  console.log(`[HTTP] Listening on port ${EXPRESS_PORT}`);
});

export default app;
