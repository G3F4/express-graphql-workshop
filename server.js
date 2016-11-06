import express from 'express';

const PORT = 30001;

express()
  .listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
