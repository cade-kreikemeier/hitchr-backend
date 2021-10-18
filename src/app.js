const express = require('express');
const apiRouter = require('./routes/apiRouter');

function App(port, client) {
  const app = express();

  app.use(express.json());

  app.use('/api', apiRouter);

  app.get('/test', async (req, res) => {
    const result = await client.query('SELECT $1::text as message', ['test']);

    res.send({ foo: result.rows[0].message });
  });

  return app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

module.exports = App;
