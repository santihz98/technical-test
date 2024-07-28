module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
      '/node_modules/(?!axios).+\\.js$'
    ],
    setupFilesAfterEnv: [
      '@testing-library/jest-dom/extend-expect'
    ],
    reporters: [
      'default',
      ['jest-junit', {
        outputDirectory: './reports',
        outputName: 'junit.xml',
      }]
    ]
  };  