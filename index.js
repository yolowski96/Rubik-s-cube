const express = require('express');
const expressConfig = require('./config/express');
const mongooseConfig = require('./config/mongoose');
const config = require('./config/config');
const routes = require('./routes');
const app = express();

expressConfig(app);
mongooseConfig(app);

app.use(routes);

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));