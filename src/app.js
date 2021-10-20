const express = require('express');

const apiRouter = require('./routes/apiRouter');

function App(port, client) {
  const app = express();

  app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));

  app.use('/api', apiRouter);

  app.get('/test', async (req, res) => {
    let result;
    try {
      result = await client.query('SELECT $1::text as message', ['test']);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }

    res.send({ foo: result.rows[0].message });
  });

  return app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Listening on http://localhost:${port}`);
    }
  });
}

module.exports = App;
