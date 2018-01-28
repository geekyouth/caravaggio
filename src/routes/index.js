const { URL } = require('url');
const { send } = require('micro');
const redirect = require('micro-redirect');
const { parseOptions } = require('../parser');
const pipeline = require('../pipeline');

const sendResource = (resource, res) => {
  console.log('rendering', resource);
  switch (resource.type) {
    case 'buffer':
      return send(res, 200, resource.buffer);
    case 'location':
      return redirect(res, 301, resource.location);
    default:
      throw new Error(`Invalid type of resource ${resource.type}`);
  }
};

module.exports = cache => async (req, res) => {
  try {
    const url = new URL(req.params._);
    const options = parseOptions(req.params.options);
    const resource = await cache.get(url, options);
    console.log('here', resource);
    if (resource) {
      return sendResource(resource, res);
    }

    console.log('and here');
    const imageBuffer = await pipeline.convert(url, options);
    console.log('buffer', imageBuffer);
    const createdResource = await cache.set(url, options, imageBuffer);
    return sendResource(createdResource, res);
  } catch (e) {
    send(res, e.statusCode || 500);
    throw (e);
  }
};
