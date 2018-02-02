module.exports = (value) => {
  const [width, height] = value.split('x');
  return {
    transformations: [
      [
        'resize', [
          (width && parseInt(width, 10)) || null,
          (height && parseInt(height, 10)) || null,
        ],
      ],
    ],
  };
};
