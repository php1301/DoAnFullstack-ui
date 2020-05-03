module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['<rootDir>/settings/setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/pages/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/pages/__mocks__/styleMock.js',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^library/(.*)$': '<rootDir>/library/$1',
    '^settings/(.*)$': '<rootDir>/settings/$1',
    '^assets/(.*)$': '<rootDir>/assets/$1',
    '^container/(.*)': '<rootDir>/container/$1',
    'tests/(.*)': '<rootDir>/__tests__/$1',
  },
};
