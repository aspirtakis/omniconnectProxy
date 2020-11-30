
require('dotenv').config();
const app = require('./app');
const DEFAULT_PORT = 8000;
const PORT = process.env.PORT || DEFAULT_PORT;

// Server is based on HTTP, probably need to change this to https but we need certificates for this
app.listen(PORT, () => {
    console.log(`STARTED: API proxy is listening on port ${PORT}`);
});
