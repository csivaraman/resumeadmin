import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/*eslint-disable no-console */

//"start": "npm run build prod && node ./dist/bundle.js",
// "start": "npm-run-all --parallel test:watch open:src lint:watch",
let host = '0.0.0.0';
const port = process.env.PORT || 3000;
if(port==3000)
  host = 'localhost';
  
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
