const express = require('express');

const {
  EXPRESS_PORT,
} = process.env;

const app = express();

app.listen(EXPRESS_PORT, () => {
  console.log(`[HTTP] Listening on port ${EXPRESS_PORT}`);
});

module.exports = app;
