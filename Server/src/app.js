import express from 'express';
import path from 'path';
import logger from 'morgan-debug';
import bodyParser from 'body-parser';
import routes from './routes';

const {
  PUBLIC_DIR = '../public',
  VIEWS_DIR = '../views'
} = process.env;

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, VIEWS_DIR));
app.set('view engine', 'pug');

app.use(logger('debug', 'combined', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
