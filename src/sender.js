const redirect = require('micro-redirect');
const path = require('path');
const sharp = require('sharp');
const compressor = require('./compressor');

module.exports = (config) => {
  const browserCache = config.get('browserCache');
  const guessTypeByExtension = config.get('guessTypeByExtension');
  const sendFactory = compressor(config);

  const getTypeByUrl = resourceName => path.extname(resourceName)
    .replace('.', '')
    .replace('jpg', 'jpeg');

  const getTypeByMetadata = async resource => sharp(resource.buffer)
    .metadata()
    .then(({ format }) => format);

  const getTypeByResource = async (resource) => {
    if (!guessTypeByExtension) {
      return getTypeByMetadata(resource);
    }
    const extension = getTypeByUrl(resource.name);
    if (!extension) {
      return getTypeByMetadata(resource);
    }
    return extension;
  };

  const getMimeType = async (resource, options) => {
    const type = options.o === 'original'
      ? await getTypeByResource(resource)
      : options.o;
    return `image/${type}`;
  };

  const getCacheControlHeader = () => browserCache && `max-age=${browserCache.maxAge}`;

  return {
    sendImage: async (resource, options, req, res) => {
      const send = sendFactory(req);
      switch (resource.type) {
        case 'buffer': {
          const cacheHeader = getCacheControlHeader();
          if (cacheHeader) {
            res.setHeader('cache-control', cacheHeader);
          }
          res.setHeader('Content-Type', await getMimeType(resource, options));
          res.setHeader('Content-Length', resource.buffer.length);
          return send(res, 200, resource.buffer);
        }
        case 'location':
          return redirect(res, 301, resource.location);
        default:
          throw new Error(`Invalid type of resource ${resource.type}`);
      }
    },
  };
};
