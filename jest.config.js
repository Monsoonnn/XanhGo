module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
};

module.exports = 'SvgMock';
module.exports.ReactComponent = 'SvgMock';