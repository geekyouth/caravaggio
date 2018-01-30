const config = require('config');
const micro = require('micro');
const path = require('path');
const router = require('./src');

const persistorType = config.get('persistor.type');
const persistorOptions = config.get('persistor.options');

let persistor;

try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  persistor = require(path.join(__dirname, 'src/persistors', persistorType))(persistorOptions);
} catch (e) {
  throw new Error(`Invalid persistor ${persistorType}. Check your configuration: ${e.message}`);
}

const server = micro(router(persistor));

server.listen(config.get('port'));
