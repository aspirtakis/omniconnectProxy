
const express = require('express');
const logger = require('morgan');
const csp = require('helmet');
const middleware = require('./middleware');
const api = require('./api');

// create the app
const app = express();

// Remove the X-Powered-By headers.
app.disable('x-powered-by');

// Trust the proxy
app.set('trust proxy', true);

// Set logging to Apache combined format
app.use(logger('combined'));

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(csp());

app.use(express.json());

// Health check to see if server is running
app.get('/health', middleware.forbidden, (req, res) => {
    const now = new Date();
    res.json({ timestamp: now.toLocaleString('nl-NL') });
});

// Route to back-end
app.use('/api/v1', middleware.forbidden, api);

// All non-configured routes will return a Not Found
app.use(middleware.notFound);

// Catch errors
app.use(middleware.errorHandler);

module.exports = app;
