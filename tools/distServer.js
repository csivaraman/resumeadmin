import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/*eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();

express()
  .use(express.static(path.join(__dirname, 'dist')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('../dist/index.html'))
  .listen(port, () => console.log(`Listening on ${ port }`))

// app.use(compression());
// app.use(express.static('dist'));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

// app.listen(port, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     open(`http://localhost:${port}`);

//   }
// });


