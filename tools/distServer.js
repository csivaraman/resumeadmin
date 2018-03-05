import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/*eslint-disable no-console */

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('server started');
    // open(`:${port}`);
  }
});
