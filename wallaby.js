module.exports = function(wallaby) {
  'use strict';
  return {
    files: ['*.js*', '!*.json', '!*.spec.js*'],
    tests: ['*.spec.js'],
    env: {
      type: 'node',
      params: {
        env: 'NODE_ENV=test',
      },
    },
    testFramework: 'jest',
    compilers: {
      '**/*.js*': wallaby.compilers.babel({
        presets: ['latest', 'stage-1'],
        plugins: [
          'transform-object-rest-spread',
          [
            'transform-runtime',
            {
              polyfill: false,
            },
          ],
        ],
      }),
    },
  };
};
