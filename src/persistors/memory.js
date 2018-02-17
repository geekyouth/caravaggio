
const persisted = {
  files: {},
  size: 0,
};

const BToMB = B => Math.round((B / 1024 / 1024) * 100) / 100;

const checkMemory = (limit, filename) => {
  if (limit && limit > 0) {
    const { size, files } = persisted;
    if (size > limit) {
      const first = Object.keys(files)[0];
      if (first !== filename) {
        delete persisted.files[first];
      }
    }
  }
};

const increaseSize = (length) => {
  persisted.size += BToMB(length);
};

module.exports = ({ limit } = { limit: 100 }) => ({
  flush: () => {
    persisted.files = {};
    persisted.size = 0;
    return Promise.resolve();
  },

  exists: filename => Promise.resolve(!!persisted.files[filename]),

  read: filename => Promise.resolve(persisted.files[filename]
    ? {
      type: 'buffer',
      buffer: persisted.files[filename],
    }
    : null),


  save: (filename, buffer) => {
    persisted.files[filename] = buffer;
    increaseSize(buffer.length);
    checkMemory(limit, filename);
    return Promise.resolve({
      type: 'buffer',
      buffer,
    });
  },
});
